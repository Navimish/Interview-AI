import React ,{useState}from 'react'
import { useNavigate,Link } from 'react-router'
import { useAuth } from '../hooks/auth.hooks';
import { LoadingScreen } from '../components/LoadingScreen';

const glassStyle = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 60%)',
    backdropFilter: 'blur(20px) saturate(160%)',
    WebkitBackdropFilter: 'blur(20px) saturate(160%)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 20px 60px rgba(0, 0, 0, 0.35)',
};

const features = [
    "Interview questions generated from the actual job description",
    "A prep roadmap built around your real skill gaps",
    "An ATS-friendly resume rewrite, ready to download",
];

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
        return <LoadingScreen message="Creating your account" />

    }

  

  return (
    <main className="min-h-screen bg-[#08090a] relative overflow-hidden grid lg:grid-cols-2">

        <div className="absolute top-[-15%] left-[10%] w-[480px] h-[480px] bg-[#5E6AD2]/20 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-[-15%] right-[10%] w-[380px] h-[380px] bg-[#8B5CF6]/15 rounded-full blur-[140px] pointer-events-none"></div>

        <h1 className="hidden">Register</h1>

        <div className="relative hidden lg:flex flex-col justify-center px-16 border-r border-white/[0.08]">
            <p className="text-[#8A8F98] text-sm font-medium mb-4 opacity-0" style={{ animation: 'fadeInUp 0.6s ease 0.1s forwards' }}>Interview AI</p>
            <h2 className="text-4xl font-semibold text-[#F7F8F8] tracking-tight leading-[1.15] max-w-sm opacity-0" style={{ animation: 'fadeInUp 0.6s ease 0.2s forwards' }}>
                Walk in already knowing what they'll ask.
            </h2>
            <p className="text-[#8A8F98] mt-5 leading-relaxed max-w-sm opacity-0" style={{ animation: 'fadeInUp 0.6s ease 0.32s forwards' }}>
                Create an account to start building your first prep report.
            </p>

            <ul className="mt-10 space-y-4 max-w-sm opacity-0" style={{ animation: 'fadeInUp 0.6s ease 0.44s forwards' }}>
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-[#C4C7CE] leading-relaxed">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#818CF8]" />
                        {feature}
                    </li>
                ))}
            </ul>
        </div>

        <div className="relative flex items-center justify-center px-4 py-16 sm:px-8">

            <div className="w-full max-w-md rounded-2xl p-8 sm:p-10 opacity-0" style={{ ...glassStyle, animation: 'fadeInUp 0.6s ease 0.2s forwards' }}>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    <div className="mb-2 lg:hidden">
                        <h2 className="text-3xl font-semibold tracking-tight text-[#f7f8f8]">
                            Create your account
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-white/50">
                            Create an account to continue to Interview AI.
                        </p>
                    </div>

                    <div className="mb-2 hidden lg:block">
                        <h2 className="text-2xl font-semibold tracking-tight text-[#f7f8f8]">
                            Create account
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-white/50">
                            Enter your details to get started.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="userName"
                            className="text-sm font-medium text-white/70"
                        >
                            userName
                        </label>

                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            onChange={(e)=>{setUserName(e.target.value)}}
                            required
                            className="w-full bg-transparent border-0 border-b border-white/[0.2] px-0 py-2.5 text-sm text-[#f7f8f8] outline-none transition placeholder:text-white/30 focus:border-[#818CF8]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor='email'
                            className="text-sm font-medium text-white/70"
                        >
                            Email
                        </label>

                        <input
                            type='email'
                            id='email'
                            name='email'
                            onChange={(e)=>{setEmail(e.target.value)}}
                            required
                            className="w-full bg-transparent border-0 border-b border-white/[0.2] px-0 py-2.5 text-sm text-[#f7f8f8] outline-none transition placeholder:text-white/30 focus:border-[#818CF8]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor='password'
                            className="text-sm font-medium text-white/70"
                        >
                            Password
                        </label>

                        <input
                            type='password'
                            id='password'
                            name="password"
                            onChange={(e)=>{setPassword(e.target.value)}}
                            required
                            className="w-full bg-transparent border-0 border-b border-white/[0.2] px-0 py-2.5 text-sm text-[#f7f8f8] outline-none transition placeholder:text-white/30 focus:border-[#818CF8]"
                        />
                    </div>

                    <button
                        type='submit'
                        className="mt-2 h-11 rounded-lg bg-[#5e6ad2] px-4 text-sm font-medium text-white transition hover:bg-[#6e7ae2] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-[#5e6ad2]/20 shadow-[0_0_0_1px_rgba(94,106,210,0.3),0_8px_24px_-8px_rgba(94,106,210,0.5)]"
                    >
                        Register
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-white/50">
                    Already have an account?{' '}
                    <Link
                        to={'/login'}
                        className="font-semibold text-[#818CF8] transition hover:text-[#A5B4FC]"
                    >
                        Login
                    </Link>
                </p>

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

export default Register