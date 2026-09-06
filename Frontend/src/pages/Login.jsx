import React from 'react'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useAuth } from '../hooks/auth.hooks';


function Login() {

    const { handleLogin} = useAuth();

    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    async function handleSubmit(e){

        
        e.preventDefault();
        setLoading(true);
        const success = await handleLogin({email,password});

        setLoading(false);

        if(success){

            

            navigate('/')
        }
    }

    if(loading){
        return (
            <main className="min-h-screen bg-[#08090a] flex items-center justify-center px-4 py-12">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/15 border-t-white/60" />
            </main>
        )

    }

  return (
    <main className="min-h-screen bg-[#08090a] flex items-center justify-center px-4 py-12">

        <h1 className="hidden">Login</h1>

        <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0f1011] p-8 shadow-sm sm:p-10">

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                <div className="mb-2">
                    <h2 className="text-3xl font-semibold tracking-tight text-[#f7f8f8]">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-white/50">
                        Login to continue to Interview AI.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-white/70"
                    >
                        Email
                    </label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={(e)=>{setEmail(e.target.value)}}
                        required
                        className="h-11 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 text-sm text-[#f7f8f8] outline-none transition placeholder:text-white/30 focus:border-[#5e6ad2]/50 focus:ring-4 focus:ring-[#5e6ad2]/10"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-white/70"
                    >
                        Password
                    </label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                         onChange={(e)=>{setPassword(e.target.value)}}
                        required
                        className="h-11 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 text-sm text-[#f7f8f8] outline-none transition placeholder:text-white/30 focus:border-[#5e6ad2]/50 focus:ring-4 focus:ring-[#5e6ad2]/10"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-2 h-11 rounded-lg bg-[#5e6ad2] px-4 text-sm font-medium text-white transition hover:bg-[#6e7ae2] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-[#5e6ad2]/20"
                >
                    Login
                </button>

            </form>

            <p className="mt-4 text-center text-sm text-white/50">
                Don’t have an account?{' '}
                <button
                    onClick={() => navigate('/register')}
                    className="font-semibold text-[#5e6ad2] hover:text-[#7c86e0]"
                >
                    Register
                </button>
            </p>

        </div>


    </main>

  )
}

export default Login