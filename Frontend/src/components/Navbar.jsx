import React from "react";
import { useNavigate } from "react-router";
import { logout } from "../services/auth.api";

export const Navbar = () => {

    const navigate = useNavigate();


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



  return (
    <nav className="border-b border-white/10 bg-[#0b0b0d] text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div>
          <h1 className="text-lg font-semibold tracking-tight">
            Interview AI
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">

          <button
            className="
              rounded-lg px-4 py-2
              text-sm font-medium text-gray-400
              transition
              hover:bg-white/5
              hover:text-white
            "

            onClick={handleHome}
          >
            Home
          </button>

          <button
            className="
              rounded-lg px-4 py-2
              text-sm font-medium text-gray-400
              transition
              hover:bg-white/5
              hover:text-white
            "

            onClick={handleViewReports}
          >
            View All Reports
          </button>

          <button
            className="
              ml-2 rounded-lg
              border border-white/10
              bg-white/[0.04]
              px-4 py-2
              text-sm font-medium text-gray-300
              transition
              hover:bg-white/10
              hover:text-white
            "

            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
};