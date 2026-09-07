import React from 'react'
import { useNavigate } from 'react-router';

const scoreStyles = (score) => {
  if (score >= 85) return { color: '#97C459', background: 'rgba(99,153,34,0.12)', border: 'rgba(99,153,34,0.25)' };
  if (score >= 70) return { color: '#EF9F27', background: 'rgba(239,159,39,0.12)', border: 'rgba(239,159,39,0.25)' };
  return { color: '#F09595', background: 'rgba(226,75,74,0.12)', border: 'rgba(226,75,74,0.25)' };
};


export const ReportCard = ({ title, date, score,reportId, index = 0 }) => {


    const navigate = useNavigate();

    const sev = scoreStyles(score);
    const delay = 0.3 + Math.min(index, 8) * 0.05;

  return (
    <div
      className="grid grid-cols-[1fr_160px_140px_120px] items-center border-b border-white/[0.06] px-6 py-5 transition hover:bg-white/[0.03] last:border-b-0 opacity-0"
      style={{ animation: `fadeInUp 0.5s ease ${delay}s forwards` }}
    >

      {/* Interview */}
      <div>
        <h2 className="text-sm font-medium text-[#F7F8F8]">
          {title}
        </h2>

        <p className="mt-1 text-xs text-[#6B6E76]">
          Interview preparation report
        </p>
      </div>


      {/* Date */}
      <div>
        <p className="text-sm text-[#8A8F98]">
              {new Date(date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                })}
        </p>
      </div>


      {/* Score */}
      <div>
        <span
          className="inline-block rounded-full px-2.5 py-1 text-xs font-medium"
          style={{ color: sev.color, background: sev.background, border: `1px solid ${sev.border}` }}
        >
          {score}%
        </span>
      </div>


      {/* Action */}
      <div className="text-right">
        <button
          onClick={()=>{navigate(`/interview/${reportId}`)}}
          className="rounded-lg px-4 py-2 text-xs font-medium text-[#A5B4FC] transition hover:text-[#F7F8F8]"
          style={{ background: 'rgba(94,106,210,0.1)', border: '1px solid rgba(129,140,248,0.25)' }}
        >
          View report
        </button>
      </div>

    </div>
  );
};