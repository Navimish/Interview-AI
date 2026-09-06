import React, { useEffect, useState } from "react";

import { ReportCard } from "../components/ReportCard";
import { getAllAiReports } from "../services/interview.api";

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
    <main className="min-h-screen bg-[#0b0b0d] px-6 py-8 text-white">

      {/* Header */}
      <header className="mx-auto mb-8 max-w-6xl">
       

        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-semibold">
              Interview Reports
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Review all your previous interview preparation reports.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-center">
            <p className="text-xs text-gray-500">
              Total Reports
            </p>

            <p className="mt-1 text-2xl font-semibold">
              {card.length}
            </p>
          </div>
        </div>
      </header>


      {/* Reports */}
      <section className="mx-auto max-w-6xl">

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101012]">

          {/* Table Header */}
          <div className="grid grid-cols-[1fr_160px_140px_120px] border-b border-white/10 px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
            <span>Interview</span>
            <span>Created</span>
            <span>Match Score</span>
            <span className="text-right">Action</span>
          </div>


          {/* Report 1 */}
          {/* <ReportCard
            title="Full Stack Developer"
            date="Sep 4, 2026"
            score={88}
          /> */}


          {
            card.map((item)=>{

              return <ReportCard
                  key={item._id}
                  title = {item.title}
                  date = {item.createdAt}
                  score = {item.matchScore}
                  reportId = {item._id}
              ></ReportCard>
            })
          }

          

          

        </div>

      </section>

    </main>
  );
};


