import axios from "axios";

const api = axios.create({
    baseURL : 'http://localhost:3000',
    withCredentials : true
})


export async function generateReport({selfDescription, jobDescription, resume}){


    try{

        const formdata = new FormData();

        formdata.append("selfDescription", selfDescription);
        formdata.append("jobDescription", jobDescription);
        formdata.append("resume", resume);

        const response = await api.post('/api/interview',formdata)

        return response.data.report
    }catch(err){
        console.error(err?.response.data || err.message);
        throw err


    }
}


export async function generateAiReportDashboard(interviewID){


    try{

        
        const response = await api.get(`/api/interview/${interviewID}`)
        
        return response.data.data
    }catch(err){
         console.error(err?.response.data || err.message);
        throw err
        
    }
}

export async function getAllAiReports(){

    try{
        const response = await api.get(`/api/interview/reports`);

        return response.data.data
    }catch(err){
        console.error(err?.response.data || err.message);
        throw err
    }
}

export async function generateResume({interviewID}){

    try{
        const response = await api.get(`/api/interview/improved-resume/${interviewID}` ,   {
                responseType: 'blob'
            })

            return response.data;


    }catch(err){
       console.error(err?.response?.data || err.message);
        throw err;
    }
}