import React, { useEffect, useState } from "react";

import { generateAiReportDashboard , generateResume} from "../services/interview.api";
import { useParams } from "react-router";


export const Dashboard = () => {

const [loading,setLoading] = useState(true);
const [report, setReport] = useState(null);

const {interviewID} = useParams();


useEffect(()=>{

    async function fetchReport(){

        try{
            const rep = await generateAiReportDashboard(interviewID);

            setReport(rep)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false);
        }


    }

    fetchReport();

},[interviewID])


const [activeSection, setActiveSection] = useState("technical");



if (!report) {
    return <main>Report not found</main>;
}   



async function handleGenerateResume(){

  setLoading(true);
 
  const pdf = await generateResume({interviewID})
  const url = window.URL.createObjectURL(pdf);

  const link = document.createElement('a');

  link.href = url;

  link.download = 'improved-resume.pdf'

  link.click();

  window.URL.revokeObjectURL(url);

  setLoading(false);

}

if(loading){
    return <main>Generation Your Ats Friendly Resume By AI, Please Wait....</main>

}




  

  return (
    <main className="min-h-screen bg-[#0b0b0d] text-white px-6 py-6">

      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Interview Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Full Stack Developer · Navneet Sharma
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3">
          <p className="text-xs text-gray-400">
            Match Score
          </p>

          <p className="text-2xl font-semibold text-green-400">
            {report.matchScore}%
          </p>
        </div>
      </header>


      {/* Dashboard */}
      <div className="grid min-h-[calc(100vh-150px)] grid-cols-[210px_1fr_260px] overflow-hidden rounded-2xl border border-white/10 bg-[#101012]">


        {/* LEFT SIDEBAR */}
        <aside className="border-r border-white/10 p-5">

          <p className="mb-5 text-xs font-medium uppercase tracking-wider text-gray-500">
            Preparation
          </p>

          <nav className="space-y-2">

            <button
              onClick={() => setActiveSection("technical")}
              className={`w-full rounded-lg px-4 py-3 text-left text-sm transition ${
                activeSection === "technical"
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              Technical Questions
            </button>

            <button
              onClick={() => setActiveSection("behavioral")}
              className={`w-full rounded-lg px-4 py-3 text-left text-sm transition ${
                activeSection === "behavioral"
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              Behavioral Questions
            </button>

            <button
              onClick={() => setActiveSection("roadmap")}
              className={`w-full rounded-lg px-4 py-3 text-left text-sm transition ${
                activeSection === "roadmap"
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              Road Map
            </button>

            <button
              onClick={handleGenerateResume}
              className={`w-full rounded-lg px-4 py-3 text-left text-sm `}
            >
              Generate ATS Friendly Resume
            </button>

          </nav>

        </aside>


        {/* CENTER CONTENT */}
        <section className="overflow-y-auto p-7">

          {activeSection === "technical" && (
            <QuestionSection
              title="Technical Questions"
              questions={report.technicalQuestions}
            />
          )}

          {activeSection === "behavioral" && (
            <QuestionSection
              title="Behavioral Questions"
              questions={report.behaviourQuestions}
            />
          )}

          {activeSection === "roadmap" && (
            <RoadMap plan={report.dailyPlan} />
          )}

        </section>


        {/* RIGHT SIDEBAR */}
        <aside className="border-l border-white/10 p-5">

          <p className="mb-5 text-xs font-medium uppercase tracking-wider text-gray-500">
            Skill Gaps
          </p>

          <div className="space-y-3">

            {report.skillGap.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
              >
                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-200">
                    {item.skill}
                  </span>

                  <span
                    className={`text-xs ${
                      item.severity === "High"
                        ? "text-red-400"
                        : item.severity === "Medium"
                        ? "text-yellow-400"
                        : "text-gray-400"
                    }`}
                  >
                    {item.severity}
                  </span>

                </div>
              </div>
            ))}

          </div>

        </aside>

      </div>

    </main>
  );
};


const QuestionSection = ({ title, questions }) => {
  return (
    <div>

      <div className="mb-7">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Questions generated specifically for your profile.
        </p>
      </div>


      <div className="space-y-5">

        {questions.map((item, index) => (

          <article
            key={index}
            className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
          >

            <div className="mb-4 flex items-start gap-4">

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs text-gray-300">
                {index + 1}
              </span>

              <h3 className="text-base font-medium leading-6 text-gray-100">
                {item.question}
              </h3>

            </div>


            <div className="ml-11 space-y-4">

              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                  Interviewer Intention
                </p>

                <p className="text-sm leading-6 text-gray-400">
                  {item.intension}
                </p>
              </div>


              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                  How to Answer
                </p>

                <p className="text-sm leading-6 text-gray-300">
                  {item.answer}
                </p>
              </div>

            </div>

          </article>

        ))}

      </div>

    </div>
  );
};


const RoadMap = ({ plan }) => {
  return (
    <div>

      <div className="mb-7">
        <h2 className="text-xl font-semibold">
          Preparation Roadmap
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Your personalized interview preparation plan.
        </p>
      </div>


      <div className="space-y-4">

        {plan.map((day) => (

          <div
            key={day.day}
            className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
          >

            <div className="flex gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sm font-medium">
                {day.day}
              </div>

              <div className="flex-1">

                <h3 className="font-medium text-gray-100">
                  {day.focus}
                </h3>

                <ul className="mt-3 space-y-2">

                  {day.tasks.map((task, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-sm leading-6 text-gray-400"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-500" />
                      {task}
                    </li>
                  ))}

                </ul>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};