import React from 'react'

export const LoadingScreen = ({ message = 'Loading...' }) => {

  return (
    <main className="min-h-screen bg-[#08080A] flex flex-col items-center justify-center relative overflow-hidden">

      <div className="absolute w-[340px] h-[340px] bg-[#5E6AD2]/35 rounded-full blur-[90px]" style={{ animation: 'driftA 10s ease-in-out infinite alternate' }}></div>
      <div className="absolute w-[300px] h-[300px] bg-[#8B5CF6]/30 rounded-full blur-[90px]" style={{ animation: 'driftB 12s ease-in-out infinite alternate' }}></div>
      <div className="absolute w-[260px] h-[260px] bg-[#EC4899]/20 rounded-full blur-[90px]" style={{ animation: 'driftC 14s ease-in-out infinite alternate' }}></div>

      <div className="absolute w-[260px] h-[340px] rounded-[40px]" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 60%)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.25)',
        animation: 'glassFloat1 16s ease-in-out infinite alternate',
      }}></div>

      <div className="absolute w-[220px] h-[220px] rounded-full" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 60%)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)',
        animation: 'glassFloat2 20s ease-in-out infinite alternate',
      }}></div>

      <div className="absolute w-[180px] h-[280px] rounded-[36px]" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 60%)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.18)',
        animation: 'glassFloat3 18s ease-in-out infinite alternate',
      }}></div>

      <div className="relative flex flex-col items-center gap-6 rounded-3xl px-14 py-12" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 60%)',
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        border: '1px solid rgba(255,255,255,0.16)',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.25), 0 20px 60px rgba(0,0,0,0.4)',
      }}>
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full" style={{
            background: 'conic-gradient(from 0deg, transparent 0%, #A5B4FC 50%, transparent 100%)',
            animation: 'spin 1s linear infinite',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))',
          }}></div>
          <div className="absolute inset-0 rounded-full border border-white/10"></div>
        </div>

        <p className="text-lg font-medium" style={{
          backgroundImage: 'linear-gradient(90deg, #A5B4FC 0%, #F7F8F8 50%, #A5B4FC 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          animation: 'shimmer 2.5s linear infinite',
        }}>
          {message}
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shimmer { to { background-position: -200% center; } }
        @keyframes driftA {
          0% { transform: translate(-32vw, -20vh) scale(1); }
          100% { transform: translate(28vw, 18vh) scale(1.2); }
        }
        @keyframes driftB {
          0% { transform: translate(30vw, 22vh) scale(1); }
          100% { transform: translate(-26vw, -16vh) scale(1.15); }
        }
        @keyframes driftC {
          0% { transform: translate(-6vw, 30vh) scale(1); }
          100% { transform: translate(10vw, -28vh) scale(1.2); }
        }
        @keyframes glassFloat1 {
          0% { transform: translate(-38vw, 24vh) rotate(-6deg); }
          100% { transform: translate(-20vw, -22vh) rotate(8deg); }
        }
        @keyframes glassFloat2 {
          0% { transform: translate(34vw, -20vh) rotate(4deg); }
          100% { transform: translate(20vw, 24vh) rotate(-10deg); }
        }
        @keyframes glassFloat3 {
          0% { transform: translate(6vw, -30vh) rotate(10deg); }
          100% { transform: translate(-14vw, 26vh) rotate(-4deg); }
        }
      `}</style>
    </main>
  )
}