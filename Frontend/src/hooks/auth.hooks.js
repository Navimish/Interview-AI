import { AuthContext } from "../context/auth.context";
import { useContext, useEffect } from "react";
import { login , register ,logout, getUser } from "../services/auth.api";



export const useAuth =()=>{

    const context = useContext(AuthContext)

    const {user,setUser,loading, setLoading} = context;


    const handleLogin = async ({email,password})=>{
        setLoading(true);

        try{
            const data = await login({email,password})
            setUser(data.user)
            return true
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    const handleRegister = async({userName,email,password})=>{
        setLoading(true);

        try{
            const data = await register({userName,email,password})

            setUser(data.user);
        }catch(err){
            console.log(err);
        }finally{

            setLoading(false);
        }
    }

    const handleLogout = async () =>{

        setLoading(true);

        try{
            await logout();
            setUser(null);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{

        const get_me = async()=>{

            setLoading(true);

            

            try{

                const data = await getUser();
                setUser(data.user);
            }catch(err){
                console.error(err.response?.data || err.message)
                throw err;
            }finally{
                setLoading(false);
            }

        }

        get_me();


    },[])


    return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout
}


}