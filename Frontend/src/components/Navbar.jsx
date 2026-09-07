import React from "react";
import { useNavigate, useLocation } from "react-router";
import { logout } from "../services/auth.api";

export const Navbar = () => {

    const navigate = useNavigate();
    const location = useLocation();


    function handleHome(){

        navigate('/')
    }

    function handleViewReports(){

        navigate('/interview/reports')
    }

    async function handleLogout(){


        try{

            const response = await logout();

            return response;
        }catch(err){
            console.log(err)
        }finally{
            navigate('/login')
        }

    }

    const isHomeActive = location.pathname === '/';
    const isReportsActive = location.pathname.startsWith('/interview/reports');



  return (
    <nav
      className="sticky top-0 z-50 text-white"
      style={{
        background: '#0A0A0B',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-2.5">

          <svg width="26" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="navLogoGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F7F8F8" />
                <stop offset="100%" stopColor="#8A8F98" />
              </linearGradient>
            </defs>
            <path d="M4 19L13 5H18L9 19H4Z" fill="url(#navLogoGrad)" />
            <path d="M12 19L21 5" stroke="url(#navLogoGrad)" strokeWidth="3.2" strokeLinecap="round" opacity="0.55" />
          </svg>

          <h1
            className="text-[17px] font-semibold text-[#F7F8F8]"
            style={{ letterSpacing: '-0.02em' }}
          >
            Interview AI
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <button
            className="relative pb-1 text-sm transition"
            style={{ color: isHomeActive ? '#F7F8F8' : '#8A8F98', fontWeight: isHomeActive ? 600 : 500 }}
            onClick={handleHome}
          >
            Home
            {isHomeActive && (
              <span
                className="absolute left-1/2 -translate-x-1/2 -bottom-[1px] h-1 w-1 rounded-full"
                style={{ background: '#818CF8' }}
              />
            )}
          </button>

          <button
            className="relative pb-1 text-sm transition"
            style={{ color: isReportsActive ? '#F7F8F8' : '#8A8F98', fontWeight: isReportsActive ? 600 : 500 }}
            onClick={handleViewReports}
          >
            View all reports
            {isReportsActive && (
              <span
                className="absolute left-1/2 -translate-x-1/2 -bottom-[1px] h-1 w-1 rounded-full"
                style={{ background: '#818CF8' }}
              />
            )}
          </button>

          <button
            className="ml-2 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-[#F7F8F8] transition hover:bg-white/[0.06]"
            style={{ border: '1px solid rgba(255,255,255,0.14)' }}
            onClick={handleLogout}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
};