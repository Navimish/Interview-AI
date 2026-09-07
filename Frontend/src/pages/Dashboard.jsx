import React, { useEffect, useState } from "react";

import { generateAiReportDashboard , generateResume} from "../services/interview.api";
import { useParams } from "react-router";
import { LoadingScreen } from "../components/LoadingScreen";


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

const severityStyles = {
  High: { color: '#F09595', background: 'rgba(226,75,74,0.12)', border: 'rgba(226,75,74,0.25)' },
  Medium: { color: '#EF9F27', background: 'rgba(239,159,39,0.12)', border: 'rgba(239,159,39,0.25)' },
  Low: { color: '#9497A0', background: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.14)' },
};


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
    return <LoadingScreen message="Generating your ATS-friendly resume" />
}

if (!report) {
    return (
      <main className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <p className="text-[#8A8F98] text-sm">Report not found</p>
      </main>
    );
} 




  

  return (
    <main className="min-h-screen bg-[#0A0A0B] relative overflow-hidden px-6 py-8 lg:px-10">

      <div className="absolute top-[-15%] left-[5%] w-[500px] h-[500px] bg-[#5E6AD2]/15 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-15%] right-[5%] w-[420px] h-[420px] bg-[#8B5CF6]/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Header */}
      <header className="relative mb-8 flex items-center justify-between opacity-0" style={{ animation: 'fadeInUp 0.6s ease 0.1s forwards' }}>
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-[#F7F8F8] tracking-tight">
            Interview dashboard
          </h1>

          <p className="mt-1.5 text-sm text-[#8A8F98]">
            Full Stack Developer · Navneet Sharma
          </p>
        </div>

        <div className="rounded-2xl px-6 py-4 text-right" style={cardStyle}>
          <p className="text-xs text-[#8A8F98]">
            Match score
          </p>

          <p className="text-3xl font-semibold text-[#8FD19E]">
            {report.matchScore}%
          </p>
        </div>
      </header>


      {/* Dashboard */}
      <div className="relative grid gap-6 lg:grid-cols-[240px_1fr_300px] items-start">


        {/* LEFT SIDEBAR */}
        <aside className="rounded-2xl p-5 lg:sticky lg:top-8 opacity-0" style={{ ...panelStyle, animation: 'fadeInUp 0.6s ease 0.22s forwards' }}>

          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-[#6B6E76]">
            Preparation
          </p>

          <nav className="space-y-1.5">

            <button
              onClick={() => setActiveSection("technical")}
              className={`w-full rounded-xl px-4 py-3 text-left text-sm transition border-l-2 ${
                activeSection === "technical"
                  ? "border-[#818CF8] text-[#F7F8F8]"
                  : "border-transparent text-[#8A8F98] hover:text-[#F7F8F8] hover:bg-white/[0.04]"
              }`}
              style={activeSection === "technical" ? { background: 'rgba(94,106,210,0.16)' } : undefined}
            >
              Technical questions
            </button>

            <button
              onClick={() => setActiveSection("behavioral")}
              className={`w-full rounded-xl px-4 py-3 text-left text-sm transition border-l-2 ${
                activeSection === "behavioral"
                  ? "border-[#818CF8] text-[#F7F8F8]"
                  : "border-transparent text-[#8A8F98] hover:text-[#F7F8F8] hover:bg-white/[0.04]"
              }`}
              style={activeSection === "behavioral" ? { background: 'rgba(94,106,210,0.16)' } : undefined}
            >
              Behavioral questions
            </button>

            <button
              onClick={() => setActiveSection("roadmap")}
              className={`w-full rounded-xl px-4 py-3 text-left text-sm transition border-l-2 ${
                activeSection === "roadmap"
                  ? "border-[#818CF8] text-[#F7F8F8]"
                  : "border-transparent text-[#8A8F98] hover:text-[#F7F8F8] hover:bg-white/[0.04]"
              }`}
              style={activeSection === "roadmap" ? { background: 'rgba(94,106,210,0.16)' } : undefined}
            >
              Road map
            </button>

          </nav>

          <div className="mt-5 pt-5 border-t border-white/[0.08]">
            <button
              onClick={handleGenerateResume}
              className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-[#A5B4FC] transition hover:text-[#F7F8F8]"
              style={{ background: 'rgba(94,106,210,0.1)', border: '1px solid rgba(129,140,248,0.25)' }}
            >
              Generate ATS-friendly resume
            </button>
          </div>

        </aside>


        {/* CENTER CONTENT */}
        <section className="rounded-2xl p-7 overflow-y-auto max-h-[calc(100vh-220px)] opacity-0" style={{ ...panelStyle, animation: 'fadeInUp 0.6s ease 0.32s forwards' }}>

          {activeSection === "technical" && (
            <QuestionSection
              title="Technical questions"
              questions={report.technicalQuestions}
            />
          )}

          {activeSection === "behavioral" && (
            <QuestionSection
              title="Behavioral questions"
              questions={report.behaviourQuestions}
            />
          )}

          {activeSection === "roadmap" && (
            <RoadMap plan={report.dailyPlan} />
          )}

        </section>


        {/* RIGHT SIDEBAR */}
        <aside className="rounded-2xl p-5 lg:sticky lg:top-8 opacity-0" style={{ ...panelStyle, animation: 'fadeInUp 0.6s ease 0.42s forwards' }}>

          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-[#6B6E76]">
            Skill gaps
          </p>

          <div className="space-y-2.5">

            {report.skillGap.map((item, index) => {
              const sev = severityStyles[item.severity] || severityStyles.Low;
              return (
                <div
                  key={index}
                  className="rounded-xl p-3.5 opacity-0"
                  style={{ ...cardStyle, animation: `fadeInUp 0.4s ease ${0.5 + Math.min(index, 8) * 0.05}s forwards` }}
                >
                  <div className="flex items-center justify-between gap-3">

                    <span className="text-sm text-[#E4E4E7] leading-snug">
                      {item.skill}
                    </span>

                    <span
                      className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium"
                      style={{ color: sev.color, background: sev.background, border: `1px solid ${sev.border}` }}
                    >
                      {item.severity}
                    </span>

                  </div>
                </div>
              );
            })}

          </div>

        </aside>

      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </main>
  );
};


const QuestionSection = ({ title, questions }) => {
  return (
    <div>

      <div className="mb-7">
        <h2 className="text-xl font-semibold text-[#F7F8F8]">
          {title}
        </h2>

        <p className="mt-1.5 text-sm text-[#8A8F98]">
          Questions generated specifically for your profile.
        </p>
      </div>


      <div className="space-y-5">

        {questions.map((item, index) => (

          <article
            key={index}
            className="rounded-2xl p-5 opacity-0"
            style={{ ...cardStyle, animation: `fadeInUp 0.45s ease ${Math.min(index, 8) * 0.06}s forwards` }}
          >

            <div className="mb-4 flex items-start gap-4">

              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-medium text-[#A5B4FC]"
                style={{ background: 'rgba(94,106,210,0.18)' }}
              >
                {index + 1}
              </span>

              <h3 className="text-base font-medium leading-6 text-[#F7F8F8]">
                {item.question}
              </h3>

            </div>


            <div className="ml-11 space-y-4">

              <div>
                <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-[#6B6E76]">
                  Interviewer intention
                </p>

                <p className="text-sm leading-6 text-[#8A8F98]">
                  {item.intension}
                </p>
              </div>


              <div>
                <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-[#6B6E76]">
                  How to answer
                </p>

                <p className="text-sm leading-6 text-[#C4C7CE]">
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
        <h2 className="text-xl font-semibold text-[#F7F8F8]">
          Preparation roadmap
        </h2>

        <p className="mt-1.5 text-sm text-[#8A8F98]">
          Your personalized interview preparation plan.
        </p>
      </div>


      <div className="space-y-4">

        {plan.map((day) => (

          <div
            key={day.day}
            className="rounded-2xl p-5 opacity-0"
            style={{ ...cardStyle, animation: `fadeInUp 0.45s ease ${Math.min(day.day, 8) * 0.06}s forwards` }}
          >

            <div className="flex gap-4">

              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-medium text-[#A5B4FC]"
                style={{ background: 'rgba(94,106,210,0.18)' }}
              >
                {day.day}
              </div>

              <div className="flex-1">

                <h3 className="font-medium text-[#F7F8F8]">
                  {day.focus}
                </h3>

                <ul className="mt-3 space-y-2">

                  {day.tasks.map((task, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-sm leading-6 text-[#8A8F98]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: '#818CF8' }} />
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