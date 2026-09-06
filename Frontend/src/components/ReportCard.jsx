import React from 'react'
import { useNavigate } from 'react-router';


export const ReportCard = ({ title, date, score,reportId }) => {


    const navigate = useNavigate();

  return (
    <div className="grid grid-cols-[1fr_160px_140px_120px] items-center border-b border-white/5 px-6 py-5 transition hover:bg-white/[0.025]">

      {/* Interview */}
      <div>
        <h2 className="text-sm font-medium text-gray-200">
          {title}
        </h2>

        <p className="mt-1 text-xs text-gray-600">
          Interview preparation report
        </p>
      </div>


      {/* Date */}
      <div>
        <p className="text-sm text-gray-400">
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
          className={`text-sm font-medium ${
            score >= 85
              ? "text-green-400"
              : score >= 70
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          {score}%
        </span>
      </div>


      {/* Action */}
      <div className="text-right">
        <button
          onClick={()=>{navigate(`/interview/${reportId}`)}}
          className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
        >
          View Report
        </button>
      </div>

    </div>
  );
};