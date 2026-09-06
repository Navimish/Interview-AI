import React, { useState } from 'react'

import { generateReport } from '../services/interview.api';
import { useNavigate } from 'react-router';

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

      setLoading(false);


      navigate(`/interview/${response._id}`)

      
    }catch(err){
      console.log(err);
    }



  }

  if(loading){
    return (
      <main className="min-h-screen bg-[#08090a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-5 w-5 rounded-full border border-white/10 border-t-white/70 animate-spin"></div>
          <p className="text-xs font-medium tracking-wide text-white/35">
            Generating report
          </p>
        </div>
      </main>
    )
  }



  return (
    <main className="min-h-screen bg-[#08090a] flex items-center justify-center px-4 py-10 text-white">

      <div className="w-full max-w-2xl rounded-2xl border border-white/[0.08] bg-[#0d0e10] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-10">

        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white/90">
            Interview Report
          </h1>

          <p className="mt-2 text-sm leading-6 text-white/35">
            Enter your details to generate a personalized interview preparation report.
          </p>
        </div>

        <div className="space-y-6">

          <div>
            <label
              htmlFor="jobDescription"
              className="mb-2 block text-sm font-medium text-white/60"
            >
              Job Description
            </label>

            <input
              type="text"
              name="jobDescription"
              placeholder="Enter Job Description"
              onChange={(e)=>{setJobDescription(e.target.value)}}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm text-white/85 placeholder:text-white/20 outline-none transition duration-200 hover:border-white/[0.12] hover:bg-white/[0.035] focus:border-white/[0.18] focus:bg-white/[0.04] focus:ring-4 focus:ring-white/[0.03]"
            />
          </div>

          <div>
            <label
              htmlFor="selfDescription"
              className="mb-2 block text-sm font-medium text-white/60"
            >
              Self Description
            </label>

            <input
              type="text"
              name="selfDescription"
              placeholder="Tell us about yourself"
              onChange={(e)=>{setSelfDescription(e.target.value)}}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm text-white/85 placeholder:text-white/20 outline-none transition duration-200 hover:border-white/[0.12] hover:bg-white/[0.035] focus:border-white/[0.18] focus:bg-white/[0.04] focus:ring-4 focus:ring-white/[0.03]"
            />
          </div>

          <div>
            <label
              htmlFor="resume"
              className="mb-2 block text-sm font-medium text-white/60"
            >
              Resume
            </label>

            <input
              type="file"
              name="resume"
              onChange={(e)=>{setResume(e.target.files[0])}}
              
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm text-white/35 outline-none transition duration-200 hover:border-white/[0.12] hover:bg-white/[0.035] file:mr-4 file:rounded-md file:border-0 file:bg-white/[0.08] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white/70 hover:file:bg-white/[0.12]"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full rounded-lg border border-white/[0.12] bg-white/[0.92] px-5 py-3 text-sm font-semibold text-black transition duration-200 hover:bg-white active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-white/[0.06] shadow-[0_8px_30px_rgba(255,255,255,0.04)]"
          >
            Submit Details
          </button>

        </div>

      </div>

    </main>
  )
}