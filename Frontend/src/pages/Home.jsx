import React, { useState } from 'react'

import { generateReport } from '../services/interview.api';
import { useNavigate } from 'react-router';
import { LoadingScreen } from '../components/LoadingScreen';

const glassStyle = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.08) 100%)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.22)',
  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.3), inset 0 -1px 8px rgba(0, 0, 0, 0.15), 0 12px 40px rgba(0, 0, 0, 0.35)',
};

export const Home = () => {


  const navigate = useNavigate();

  const [jobDescription,setJobDescription] = useState('');
  const [selfDescription,setSelfDescription] = useState('');
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);







  async function handleSubmit(){


    try{
      setLoading(true);

      
      const response = await generateReport({selfDescription, jobDescription, resume})

     


      navigate(`/interview/${response._id}`)

      
    }catch(err){
      console.log(err);
    }finally{
       setLoading(false);
    }



  }

  if(loading){
 return <LoadingScreen message="Preparing your report" />
  }



  return (
    <main className="min-h-screen bg-[#0A0A0B] relative overflow-hidden grid lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)]">

      <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-[#5E6AD2]/30 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[15%] w-[400px] h-[400px] bg-[#8B5CF6]/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-0 border-b lg:border-b-0 lg:border-r border-white/[0.08]">
        <p className="text-[#8A8F98] text-sm font-medium mb-4 opacity-0 animate-[fadeInUp_0.6s_ease_0.1s_forwards]">Interview prep</p>
        <h1 className="text-4xl lg:text-[3.2rem] text-[#F7F8F8] leading-[1.1] tracking-tight max-w-sm font-semibold opacity-0 animate-[fadeInUp_0.6s_ease_0.2s_forwards]">
          Walk in already knowing what they'll ask.
        </h1>
        <p className="text-[#8A8F98] mt-6 leading-relaxed max-w-sm opacity-0 animate-[fadeInUp_0.6s_ease_0.35s_forwards]">
          Give us the role, a little about yourself, and your resume. We'll put together a report built around the actual interview ahead of you.
        </p>
      </div>

      <div className="relative flex items-center px-8 py-16 lg:px-20">
        <div className="w-full max-w-xl space-y-6 opacity-0 animate-[fadeInUp_0.6s_ease_0.45s_forwards]">

          <div className="rounded-xl px-6 py-5 transition" style={glassStyle}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono text-[#A5B4FC]">01</span>
              <label
                htmlFor="jobDescription"
                className="text-sm font-medium text-[#F7F8F8]"
              >
                Job description
              </label>
            </div>

            <input
              type="text"
              name="jobDescription"
              placeholder="Enter Job Description"
              onChange={(e)=>{setJobDescription(e.target.value)}}
              className="w-full bg-transparent border-0 border-b border-white/[0.2] px-0 py-2 text-[#F7F8F8] placeholder-[#B0B3BC] outline-none transition focus:border-[#A5B4FC]"
            />
          </div>

          <div className="rounded-xl px-6 py-5 transition" style={glassStyle}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono text-[#A5B4FC]">02</span>
              <label
                htmlFor="selfDescription"
                className="text-sm font-medium text-[#F7F8F8]"
              >
                Self description
              </label>
            </div>

            <input
              type="text"
              name="selfDescription"
              placeholder="Tell us about yourself"
              onChange={(e)=>{setSelfDescription(e.target.value)}}
              className="w-full bg-transparent border-0 border-b border-white/[0.2] px-0 py-2 text-[#F7F8F8] placeholder-[#B0B3BC] outline-none transition focus:border-[#A5B4FC]"
            />
          </div>

          <div className="rounded-xl px-6 py-5 transition" style={glassStyle}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono text-[#A5B4FC]">03</span>
              <label
                htmlFor="resume"
                className="text-sm font-medium text-[#F7F8F8]"
              >
                Resume
              </label>
            </div>

            <input
              type="file"
              name="resume"
              onChange={(e)=>{setResume(e.target.files[0])}}
              
              className="w-full text-sm text-[#C4C7CE] file:mr-4 file:rounded-md file:border-0 file:bg-white/20 file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#F7F8F8] hover:file:bg-white/[0.28] transition"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-[#5E6AD2] px-5 py-3.5 font-medium text-white transition hover:bg-[#6E7AE2] active:scale-[0.99] shadow-[0_0_0_1px_rgba(94,106,210,0.3),0_8px_24px_-8px_rgba(94,106,210,0.5)]"
          >
            Generate report
          </button>

        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </main>
  )
}