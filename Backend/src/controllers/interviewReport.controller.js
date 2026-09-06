const interviewReportModel = require('../models/InterviewReport.model')
const { generateInterviewReport, generateResume } = require('../services/ai.services')
const { PDFParse } = require('pdf-parse');


async function interviewReport(req, res) {


    const { selfDescription, jobDescription } = req.body;

    const resumeData = req.file.buffer;

    try {

        const parser = new PDFParse({ data: resumeData });

        const parsedResume = await parser.getText();

        const response = await generateInterviewReport({
            resume: parsedResume.text,
            selfDescription,
            jobDescription
        })

    // console.log("REQ.USER:", req.user);
    // console.log("USER ID:", req.user._id);


        const data = await interviewReportModel.create({
            jobDescription,
            resume: parsedResume.text,
            selfDescription,
            user: req.user.id,
            ...response

        })

        res.status(201).json({
            message: "Interview report generated successfully",
            report: data
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Failed to generate interview report"
        });
    }





}


async function interviewReportById(req, res) {

    const interviewID = req.params.interviewID;

    try {

        const response = await interviewReportModel.findOne({ _id: interviewID })


        res.status(200).json({
            message: "Interview Report Fetched By ID",
            data: response
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Interview Report Fetch By ID Failed"
        })
    }
}

async function interviewReportsByUser(req, res) {

    const id = req.user.id;

    try {

        const response = await interviewReportModel.find({
            user: id
        }).sort({ createdAt: -1 }).select('-resume -selfDescription -jobDescription -__v -technicalQuestions -behaviourQuestions -skillGap -dailyPlan')

        res.status(200).json({
            message: "Interview Reports Fetched Successfully",
            data: response
        })

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Failed to Fetch Interview Reports"
        });
    }



}

async function newResume(req, res) {

    const interviewID = req.params.interviewID;

    try {

        const report = await interviewReportModel.findById(interviewID)

        const resume = report.resume

        const response = await generateResume({ report, resume })

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="improved-resume.pdf"'
        })

        res.send(response);
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "Resume Generation Failed"
        })
    }
}

module.exports = { interviewReport, interviewReportById, interviewReportsByUser, newResume }