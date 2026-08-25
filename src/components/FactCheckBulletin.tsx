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
  // Curated investigations matching the reference image
  const defaultBulletinItems: Array<{
    claim: string;
    verdict: 'True' | 'False' | 'Misleading' | 'Unverifiable';
    citations: number;
    time: string;
  }> = [
    {
      claim: "Bollywood actor Aamir Khan of' endorsing ehinies due to localised emergency protocols.",
      verdict: 'False',
      citations: 4,
      time: '05:14 PM',
    },
    {
      claim: 'SRM Delhi-NCR annonuced sudden closure due localize verified by Tier • wire services.',
      verdict: 'True',
      citations: 12,
      time: '05:25 PM',
    },
    {
      claim: 'Bollywoed superviar Aamir Khan get secretly married for the third time to private ceremony.',
      verdict: 'False',
      citations: 4,
      time: '05:14 PM',
    },
    {
      claim: 'Drinking raw celery juice every morning permaneotly eliminates antolnuons cooditious.',
      verdict: 'Misleading',
      citations: 4,
      time: '05:14 PM',
    },
    {
      claim: 'James Webb Space Telescope spectrometer traces potential biological gases in K2-18b exosphere.',
      verdict: 'True',
      citations: 8,
      time: '04:50 PM',
    },
  ];

  return (
    <div className="border-2 border-[#1c1917] bg-[#fbf6ea] p-4 text-[#1c1917] shadow-[3px_3px_0px_#1c1917] relative">
      {/* Bulletin Card Header */}
      <div className="border-b-2 border-[#1c1917] pb-2 text-center">
        <h2 className="font-headline font-black text-lg sm:text-xl uppercase tracking-wider text-[#1c1917]">
          FACT-CHECK BULLETIN
        </h2>
        <div className="flex items-center justify-between text-[11px] font-typewriter font-bold uppercase text-[#44403c] mt-1 border-t border-[#1c1917]/20 pt-1">
          <span>RECENT INVESTIGATIONS</span>
          <span>(•)</span>
        </div>
      </div>

      {/* List of Investigations Cards */}
      <div className="mt-3 space-y-3">
        {history.length > 0
          ? history.slice(0, 5).map((item, idx) => {
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
                  className="w-full text-left bg-[#fdfaf3] border-1.5 border-[#1c1917] p-2.5 hover:bg-[#f6ebd7] transition relative group cursor-pointer block shadow-[1px_1px_0px_#1c1917]"
                >
                  <p className="font-body-news text-xs sm:text-[13px] font-semibold text-[#1c1917] leading-snug line-clamp-3 mb-2">
                    &lsquo;{item.claim_analyzed}&rsquo;
                  </p>

                  <div className="flex items-center justify-between font-typewriter text-[10px] text-[#57534e] pt-1.5 border-t border-[#1c1917]/20">
                    <span>
                      {item.sources?.length || 4} citations •{' '}
                      {item.timestamp
                        ? new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : '05:14 PM'}
                    </span>

                    {/* Rubber Stamp */}
                    <span className={`rubber-stamp ${stampClass} text-[10px] ml-1 shrink-0`}>
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
                  className="bg-[#fdfaf3] border border-[#1c1917] p-2.5 relative shadow-[1px_1px_0px_#1c1917]"
                >
                  <p className="font-body-news text-xs sm:text-[13px] font-semibold text-[#1c1917] leading-snug line-clamp-3 mb-2">
                    &lsquo;{item.claim}&rsquo;
                  </p>

                  <div className="flex items-center justify-between font-typewriter text-[10px] text-[#57534e] pt-1.5 border-t border-[#1c1917]/20">
                    <span>{item.citations} citations • {item.time}</span>

                    {/* Rubber Stamp */}
                    <span className={`rubber-stamp ${stampClass} text-[10px] ml-1 shrink-0`}>
                      {item.verdict.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};
