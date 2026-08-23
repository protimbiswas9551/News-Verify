import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initializer for Gemini client
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Helper: Format error messages cleanly
function formatErrorMessage(error: any): string {
  if (!error) return 'An unexpected error occurred during verification.';
  const msg = typeof error === 'string' ? error : error?.message || String(error);

  if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('quota')) {
    return 'Gemini API rate limit reached (HTTP 429). The system tried to back off, but quota is temporarily limited. Please wait 15–30 seconds and try again.';
  }

  try {
    const jsonStart = msg.indexOf('{');
    if (jsonStart !== -1) {
      const parsed = JSON.parse(msg.slice(jsonStart));
      if (parsed?.error?.message) {
        return parsed.error.message;
      }
    }
  } catch {}

  return msg;
}

// Helper: Call Gemini with exponential backoff retry and model fallback on 429
async function generateGeminiContentWithRetry(ai: GoogleGenAI, params: any, maxRetries = 2) {
  const modelsToTry = ['gemini-3.7-flash', 'gemini-2.5-flash'];
  let lastError: any = null;

  for (const model of modelsToTry) {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await ai.models.generateContent({
          ...params,
          model,
        });
        return response;
      } catch (err: any) {
        lastError = err;
        const errStr = String(err?.message || err);
        const isRateLimit = errStr.includes('429') || errStr.includes('RESOURCE_EXHAUSTED') || errStr.includes('quota');

        if (isRateLimit && attempt < maxRetries) {
          const delay = (attempt + 1) * 2000;
          console.warn(`[Gemini RateLimit 429 on ${model}] Retrying attempt ${attempt + 1}/${maxRetries} after ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        // Break inner loop to try fallback model if 429 persisted
        if (isRateLimit) {
          console.warn(`[Gemini 429 on ${model}] Trying fallback model...`);
          break;
        } else {
          // If not rate limit error, throw immediately
          throw err;
        }
      }
    }
  }

  throw lastError;
}

// Preset sample claims across multiple categories
const SAMPLE_CLAIMS = [
  {
    id: 'sample-1',
    category: 'Science',
    claim: 'NASA James Webb Space Telescope detected atmospheric water vapor on habitable zone exoplanet LHS 1140 b.',
    context: 'Recent astrophysical publications discussing potential habitable worlds within 50 light years.',
  },
  {
    id: 'sample-2',
    category: 'Economy',
    claim: 'The Federal Reserve announced an emergency policy to completely phase out physical US cash by December 2026.',
    context: 'Viral social media claims about central bank digital currencies (CBDCs) replacing paper dollar bills.',
  },
  {
    id: 'sample-3',
    category: 'Health',
    claim: 'Drinking raw celery juice every morning permanently reverses type 1 and type 2 diabetes with zero insulin needed.',
    context: 'Alternative medicine wellness video circulating on TikTok and Instagram.',
  },
  {
    id: 'sample-4',
    category: 'Tech',
    claim: 'OpenAI and Microsoft signed an agreement to deploy self-replicating military autonomous drone swarms.',
    context: 'Sensationalized blog post claiming AI safety policies were completely dissolved.',
  },
  {
    id: 'sample-5',
    category: 'Politics',
    claim: 'United Nations passed a binding resolution granting itself jurisdiction over all domestic municipal zoning laws.',
    context: 'Conspiracy theories regarding UN Agenda 2030 and local housing regulations.',
  },
];

// Helper: Determine Domain Tier based on URL / Publisher
function categorizeDomainTier(url: string, title: string = ''): 1 | 2 | 3 {
  const lowerUrl = url.toLowerCase();
  const lowerTitle = title.toLowerCase();

  const tier1Indicators = [
    'reuters.com', 'apnews.com', 'afp.com', 'bloomberg.com',
    'nature.com', 'science.org', 'nasa.gov', 'cdc.gov', 'who.int',
    'nih.gov', '.gov', '.edu', 'snopes.com', 'factcheck.org',
    'politifact.com'
  ];

  const tier2Indicators = [
    'bbc.com', 'bbc.co.uk', 'nytimes.com', 'wsj.com', 'washingtonpost.com',
    'theguardian.com', 'cnn.com', 'nbcnews.com', 'cbsnews.com', 'abcnews.go.com',
    'ft.com', 'economist.com', 'time.com', 'forbes.com', 'theverge.com',
    'arstechnica.com', 'scientificamerican.com', 'dw.com', 'france24.com',
    'aljazeera.com', 'techcrunch.com'
  ];

  if (tier1Indicators.some((ind) => lowerUrl.includes(ind) || lowerTitle.includes(ind))) {
    return 1;
  }
  if (tier2Indicators.some((ind) => lowerUrl.includes(ind) || lowerTitle.includes(ind))) {
    return 2;
  }
  return 3;
}

// Helper: Query Tavily Search API
async function fetchTavilySearch(query: string, customApiKey?: string) {
  const apiKey = customApiKey || process.env.TAVILY_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        query,
        search_depth: 'advanced',
        include_answer: true,
        max_results: 6,
        topic: 'news',
      }),
    });

    if (!res.ok) {
      console.warn('Tavily API responded with status:', res.status);
      return null;
    }

    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.warn('Tavily API call failed:', err);
    return null;
  }
}

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    hasTavilyKey: Boolean(process.env.TAVILY_API_KEY),
  });
});

// API: Sample claims
app.get('/api/sample-claims', (req, res) => {
  res.json({ samples: SAMPLE_CLAIMS });
});

// API: Fact-checking & Verification
app.post('/api/verify', async (req, res) => {
  try {
    const { text, url, customTavilyKey, depth = 'standard' } = req.body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Please provide a valid claim, news excerpt, or text.' });
    }

    const rawInput = text.trim();
    const ai = getGeminiClient();

    // STEP 1: Live Web Search (Tavily if key configured)
    let tavilyContext = '';
    let tavilySources: any[] = [];
    const tavilyResults = await fetchTavilySearch(rawInput, customTavilyKey);

    if (tavilyResults && tavilyResults.length > 0) {
      tavilySources = tavilyResults.map((r: any) => ({
        title: r.title || 'News Report',
        url: r.url,
        domain_tier: categorizeDomainTier(r.url, r.title),
        publisher: (function () {
          try {
            return new URL(r.url).hostname.replace('www.', '');
          } catch {
            return 'Web Source';
          }
        })(),
        snippet: r.content ? r.content.slice(0, 300) : '',
        published_date: r.published_date || undefined,
      }));

      tavilyContext = `\n\n--- TAVILY LIVE WEB SEARCH FINDINGS ---\n` +
        tavilyResults.map((r: any, idx: number) => `[Source ${idx + 1}] ${r.title} (${r.url})\n${r.content || ''}`).join('\n\n');
    }

    // STEP 2: Impartial Fact-Checking Synthesis with Gemini (Single-Pass for low quota usage)
    const systemInstruction = `You are a world-class impartial investigative journalist and senior fact-checker.
Your duty is to cross-examine claims strictly against current verified web facts, primary documentation, and Tier-1 wire services (Reuters, AP, AFP, BBC, scientific journals, government registries).

CRITICAL DIRECTIVES:
1. claim_analyzed: If the user provided a full article or complex text, extract and specify the single core factual proposition being investigated in this field. Otherwise, use the concise claim sentence.
2. Objectivity: Impartial, balanced, evidence-based reasoning without editorializing or political bias.
3. verdict: EXACTLY one of: "True", "False", "Misleading", "Unverifiable".
4. truth_percentage: A float representing confidence (e.g. 85.5, 0.0, 100.0). Decimals must be rounded to at most ONE decimal place (e.g., 92.4, never 92.400).
5. reasoning: A clear, concise paragraph explaining the verdict based on current live evidence.
6. dependency_analysis: A short evaluation of the credibility of sources available (e.g., "Relies heavily on Tier-1 wire services (AP, Reuters) and official government press releases", or "Originates from unverified social media accounts with zero corroboration from mainstream wire services").
7. sources: List of cited sources with title, url, domain_tier (1 for primary/wire outlets, 2 for mainstream, 3 for unverified blogs/social), and snippet.
8. key_evidence: 2 to 4 key bullet points with "point" (string), "type" ("supporting" | "refuting" | "context"), and optional "source_title".
9. bias_rating: A short phrase describing the framing or nature of the original claim (e.g., "Factually Accurate", "Decontextualized Rumor", "Fabricated Satire / Hoax", "Partisan Spin", "Preliminary Research").

Output format MUST be valid JSON only matching the schema described.`;

    const prompt = `Claim / Article to Verify:
${rawInput}
${url ? `\nUser provided reference URL: ${url}` : ''}

${tavilyContext}

Investigate this claim right now using live web search grounding and investigative analysis. Extract the single core claim into claim_analyzed and produce the complete fact-checking report as JSON.`;

    // Invoke Gemini with Google Search tool enabled and retry mechanism
    const response = await generateGeminiContentWithRetry(ai, {
      contents: prompt,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
        responseMimeType: 'application/json',
      },
    });

    let rawOutput = response.text || '{}';
    // Clean potential markdown blocks or wrapper text
    rawOutput = rawOutput.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      rawOutput = jsonMatch[0];
    }

    let parsedResult: any = {};
    try {
      parsedResult = JSON.parse(rawOutput);
    } catch (parseErr) {
      console.error('Failed to parse Gemini output:', rawOutput);
      parsedResult = {
        claim_analyzed: rawInput.slice(0, 140),
        verdict: 'Unverifiable',
        truth_percentage: 50.0,
        reasoning: rawOutput || 'Unable to parse verification verdict.',
        dependency_analysis: 'Direct synthesis fallback.',
        sources: [],
      };
    }

    // Grounding chunks from Google Search Grounding
    const groundingChunks = (response as any).candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const googleSearchSources: any[] = [];

    if (Array.isArray(groundingChunks)) {
      for (const chunk of groundingChunks) {
        if (chunk?.web?.uri) {
          const uri = chunk.web.uri;
          const title = chunk.web.title || 'Verified Web Citation';
          let hostname = '';
          try {
            hostname = new URL(uri).hostname.replace('www.', '');
          } catch {
            hostname = uri;
          }
          googleSearchSources.push({
            title,
            url: uri,
            publisher: hostname,
            domain_tier: categorizeDomainTier(uri, title),
            snippet: 'Retrieved via Google Search Grounding',
          });
        }
      }
    }

    // Combine and deduplicate sources
    const allSources = [...(parsedResult.sources || []), ...tavilySources, ...googleSearchSources];
    const seenUrls = new Set<string>();
    const deduplicatedSources: any[] = [];

    for (const src of allSources) {
      if (!src || !src.url) continue;
      const normalizedUrl = src.url.trim().toLowerCase();
      if (!seenUrls.has(normalizedUrl)) {
        seenUrls.add(normalizedUrl);
        deduplicatedSources.push({
          title: src.title || 'Source Citation',
          url: src.url,
          domain_tier: src.domain_tier || categorizeDomainTier(src.url, src.title),
          publisher: src.publisher || (function () {
            try { return new URL(src.url).hostname.replace('www.', ''); } catch { return 'Web Source'; }
          })(),
          snippet: src.snippet || '',
          published_date: src.published_date,
        });
      }
    }

    // Enforce truth_percentage single decimal float
    let truthPct = 50.0;
    if (typeof parsedResult.truth_percentage === 'number') {
      truthPct = Math.round(parsedResult.truth_percentage * 10) / 10;
    } else if (typeof parsedResult.truth_percentage === 'string') {
      const parsedFloat = parseFloat(parsedResult.truth_percentage);
      truthPct = isNaN(parsedFloat) ? 50.0 : Math.round(parsedFloat * 10) / 10;
    }

    // Enforce strict verdict type
    const validVerdicts = ['True', 'False', 'Misleading', 'Unverifiable'];
    let finalVerdict = parsedResult.verdict;
    if (!validVerdicts.includes(finalVerdict)) {
      if (truthPct >= 75) finalVerdict = 'True';
      else if (truthPct <= 25) finalVerdict = 'False';
      else if (truthPct > 25 && truthPct < 75) finalVerdict = 'Misleading';
      else finalVerdict = 'Unverifiable';
    }

    const finalResponse = {
      claim_analyzed: parsedResult.claim_analyzed || rawInput,
      verdict: finalVerdict,
      truth_percentage: truthPct,
      reasoning: parsedResult.reasoning || 'Investigation completed with current web data.',
      dependency_analysis: parsedResult.dependency_analysis || 'Analyzed via live wire & web sources.',
      sources: deduplicatedSources.slice(0, 10),
      key_evidence: parsedResult.key_evidence || [],
      bias_rating: parsedResult.bias_rating || (finalVerdict === 'True' ? 'Corroborated by Primary Sources' : 'Disputed / Unsubstantiated Claim'),
      timestamp: new Date().toISOString(),
      search_method_used: tavilyResults && tavilyResults.length > 0 ? 'Gemini Google Search + Tavily Live Search' : 'Gemini Google Search Grounding',
    };

    return res.json(finalResponse);
  } catch (error: any) {
    console.error('Fact checking verification error:', error);
    const formattedError = formatErrorMessage(error);
    const isRateLimit = String(error).includes('429') || String(error?.message).includes('429') || String(error).includes('RESOURCE_EXHAUSTED');
    return res.status(isRateLimit ? 429 : 500).json({
      error: formattedError,
    });
  }
});

// Vite middleware or static serving
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fact-checking server running at http://0.0.0.0:${PORT}`);
  });
}

start();
