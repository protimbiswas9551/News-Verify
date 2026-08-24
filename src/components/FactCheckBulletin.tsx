import React from 'react';
import { FactCheckResult } from '../types';

interface FactCheckBulletinProps {
  history: FactCheckResult[];
  onSelectResult: (result: FactCheckResult) => void;
  isLoading: boolean;
}

export const FactCheckBulletin: React.FC<FactCheckBulletinProps> = ({
  history,
  onSelectResult,
  isLoading,
}) => {
  // Curated recent investigations matching the authentic newspaper bulletin if history is still short
  const defaultBulletinItems: Array<{
    claim: string;
    verdict: 'True' | 'False' | 'Misleading' | 'Unverifiable';
    citations: number;
    time: string;
  }> = [
    {
      claim: 'Bollywood actor Aamir Khan video of endorsing political party in Gauri Gwarti is verified deepfake.',
      verdict: 'False',
      citations: 8,
      time: '06:43 PM',
    },
    {
      claim: 'SRM Delhi-NCR announced sudden holiday closure due to localized emergency protocols.',
      verdict: 'Unverifiable',
      citations: 4,
      time: '06:25 PM',
    },
    {
      claim: 'Ministry of Defence official Dwarka residence inquiry reports verified by Tier-1 wire services.',
      verdict: 'True',
      citations: 12,
      time: '06:41 PM',
    },
    {
      claim: 'Bollywood superstar Aamir Khan got secretly married for the third time in private ceremony.',
      verdict: 'False',
      citations: 7,
      time: '06:23 PM',
    },
    {
      claim: 'Drinking raw celery juice every morning permanently eliminates autoimmune conditions.',
      verdict: 'Misleading',
      citations: 9,
      time: '05:58 PM',
    },
  ];

  return (
    <div className="newsprint-paper p-4 sm:p-5 text-[#1c1917] h-full flex flex-col justify-between space-y-4">
      <div>
        {/* Header */}
        <div className="border-b-2 border-[#1c1917] pb-2 text-center">
          <h2 className="font-headline font-black text-base sm:text-lg uppercase tracking-wider text-[#1c1917]">
            Fact-Check Bulletin
          </h2>
          <div className="flex items-center justify-between text-[11px] font-typewriter font-bold uppercase text-[#44403c] mt-0.5 border-t border-[#1c1917]/30 pt-1">
            <span>Recent Investigations</span>
            <span>({history.length > 0 ? history.length : defaultBulletinItems.length})</span>
          </div>
        </div>

        {/* List of cards */}
        <div className="mt-3 space-y-3">
          {history.length > 0
            ? history.slice(0, 6).map((item, idx) => {
                const verdictUpper = item.verdict.toUpperCase();
                let stampClass = 'rubber-stamp-unverifiable';
                if (item.verdict === 'True') stampClass = 'rubber-stamp-true';
                else if (item.verdict === 'False') stampClass = 'rubber-stamp-false';
                else if (item.verdict === 'Misleading') stampClass = 'rubber-stamp-misleading';

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectResult(item)}
                    className="w-full text-left newsprint-card p-3 transition hover:bg-[#f5ecda] hover:border-[#1c1917] relative group cursor-pointer overflow-hidden block"
                  >
                    <p className="font-headline text-xs font-semibold text-[#1c1917] leading-snug line-clamp-3 mb-3 pr-2">
                      "{item.claim_analyzed}"
                    </p>

                    <div className="flex items-center justify-between font-typewriter text-[10px] text-[#57534e] pt-1.5 border-t border-[#1c1917]/20">
                      <span>
                        {item.sources?.length || 5} citations •{' '}
                        {item.timestamp
                          ? new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : '06:30 PM'}
                      </span>

                      {/* Overlaid Slanted Rubber Stamp */}
                      <span className={`rubber-stamp ${stampClass} text-[10px] ml-2 shrink-0`}>
                        {verdictUpper}
                      </span>
                    </div>
                  </button>
                );
              })
            : defaultBulletinItems.map((item, idx) => {
                let stampClass = 'rubber-stamp-unverifiable';
                if (item.verdict === 'True') stampClass = 'rubber-stamp-true';
                else if (item.verdict === 'False') stampClass = 'rubber-stamp-false';
                else if (item.verdict === 'Misleading') stampClass = 'rubber-stamp-misleading';

                return (
                  <div
                    key={idx}
                    className="newsprint-card p-3 relative overflow-hidden"
                  >
                    <p className="font-headline text-xs font-semibold text-[#1c1917] leading-snug line-clamp-3 mb-2.5">
                      "{item.claim}"
                    </p>

                    <div className="flex items-center justify-between font-typewriter text-[10px] text-[#57534e] pt-1.5 border-t border-[#1c1917]/20">
                      <span>{item.citations} citations • {item.time}</span>

                      {/* Slanted Stamp */}
                      <span className={`rubber-stamp ${stampClass} text-[10px] ml-1 shrink-0`}>
                        {item.verdict.toUpperCase()}
                      </span>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>

      {/* Bulletin Footer */}
      <div className="pt-3 border-t-2 border-[#1c1917] text-center text-[10px] font-typewriter text-[#57534e]">
        <span>❧ Archived by SahiKya Desk</span>
      </div>
    </div>
  );
};
