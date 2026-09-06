import React ,{useState}from 'react'
import { useNavigate,Link } from 'react-router'
import { useAuth } from '../hooks/auth.hooks';

function Register() {

    const {loading, handleRegister} = useAuth();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();

    await handleRegister({userName,email,password})


    navigate('/login')
  }

    if(loading){
        return <h1>Loading...</h1>

    }

  

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
        <h1 className="hidden">Register</h1>

        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-black/20 sm:p-10">

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                <div className="mb-2">
                    <h2 className="text-3xl font-semibold tracking-tight text-white">
                        Create your account
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                        Create an account to continue to Interview AI.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="userName"
                        className="text-sm font-medium text-slate-300"
                    >
                        userName
                    </label>

                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        onChange={(e)=>{setUserName(e.target.value)}}
                        required
                        className="h-11 rounded-lg border border-slate-700 bg-slate-950 px-3.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor='email'
                        className="text-sm font-medium text-slate-300"
                    >
                        Email
                    </label>

                    <input
                        type='email'
                        id='email'
                        name='email'
                        onChange={(e)=>{setEmail(e.target.value)}}
                        required
                        className="h-11 rounded-lg border border-slate-700 bg-slate-950 px-3.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor='password'
                        className="text-sm font-medium text-slate-300"
                    >
                        Password
                    </label>

                    <input
                        type='password'
                        id='password'
                        name="password"
                        onChange={(e)=>{setPassword(e.target.value)}}
                        required
                        className="h-11 rounded-lg border border-slate-700 bg-slate-950 px-3.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                </div>

                <button
                    type='submit'
                    className="mt-2 h-11 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                >
                    Register
                </button>

            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
                Already have an account?{' '}
                <Link
                    to={'/login'}
                    className="font-semibold text-blue-500 transition hover:text-blue-400"
                >
                    Login
                </Link>
            </p>

        </div>

    </main>

  )
}

export default Register