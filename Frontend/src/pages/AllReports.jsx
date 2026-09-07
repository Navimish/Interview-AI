import React, { useEffect, useState } from "react";

import { ReportCard } from "../components/ReportCard";
import { getAllAiReports } from "../services/interview.api";

const panelStyle = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
  backdropFilter: 'blur(20px) saturate(150%)',
  WebkitBackdropFilter: 'blur(20px) saturate(150%)',
  border: '1px solid rgba(255,255,255,0.09)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.25)',
};

const cardStyle = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
};

export const AllReports = () => {


  const [card, setCard] = useState([]);


  useEffect(()=>{

    async function fetchAllReports(){

      try{

        const response = await getAllAiReports();

        console.log(response)

        setCard(response);
      }catch(err){
        console.log(err);
      }

    }

    fetchAllReports();

  },[])




  return (
    <main className="min-h-screen bg-[#0A0A0B] relative overflow-hidden px-6 py-10 text-white">

      <div className="absolute top-[-15%] left-[8%] w-[500px] h-[500px] bg-[#5E6AD2]/15 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-15%] right-[8%] w-[420px] h-[420px] bg-[#8B5CF6]/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Header */}
      <header className="relative mx-auto mb-8 max-w-6xl opacity-0" style={{ animation: 'fadeInUp 0.6s ease 0.1s forwards' }}>
       

        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#F7F8F8] tracking-tight">
              Interview reports
            </h1>

            <p className="mt-2 text-sm text-[#8A8F98]">
              Review all your previous interview preparation reports.
            </p>
          </div>

          <div className="rounded-2xl px-6 py-4 text-center" style={cardStyle}>
            <p className="text-xs text-[#8A8F98]">
              Total reports
            </p>

            <p className="mt-1 text-2xl font-semibold text-[#F7F8F8]">
              {card.length}
            </p>
          </div>
        </div>
      </header>


      {/* Reports */}
      <section className="relative mx-auto max-w-6xl opacity-0" style={{ animation: 'fadeInUp 0.6s ease 0.25s forwards' }}>

        <div className="overflow-hidden rounded-2xl" style={panelStyle}>

          {/* Table Header */}
          <div className="grid grid-cols-[1fr_160px_140px_120px] border-b border-white/[0.08] px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#6B6E76]">
            <span>Interview</span>
            <span>Created</span>
            <span>Match score</span>
            <span className="text-right">Action</span>
          </div>


          {/* Report 1 */}
          {/* <ReportCard
            title="Full Stack Developer"
            date="Sep 4, 2026"
            score={88}
          /> */}


          {
            card.map((item, index)=>{

              return <ReportCard
                  key={item._id}
                  title = {item.title}
                  date = {item.createdAt}
                  score = {item.matchScore}
                  reportId = {item._id}
                  index = {index}
              ></ReportCard>
            })
          }

          

          

        </div>

      </section>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </main>
  );
};