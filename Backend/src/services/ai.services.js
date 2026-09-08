const { GoogleGenAI } = require('@google/genai');
const { z } = require('zod');
const puppeteer = require('puppeteer');






const reportSchema = z.object({

    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intension: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc."),

    })).describe('Technical questions that can be asked in the interview along with their intention and how to answer them'),

    behaviourQuestions: z.array(z.object({
        question: z.string().describe("The behavioural question can be asked in the interview"),
        intension: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc."),

    })).describe('Behavioural questions that can be asked in the interview along with their intention and how to answer them'),

    skillGap: z.array(z.object({
        skill: z.string().describe('The skill which the candidate is lacking'),
        severity: z.enum(['Low', 'Medium', 'High']).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")

    })).describe("List of skill gaps in the candidate's profile along with their severity"),

    dailyPlan: z.array(z.object({

        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe('List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc')
    })).describe("The title of the job for which the interview report is generated"),
    title: z.string().describe("The title of the job for which the interview report is generated"),


})





const ai = new GoogleGenAI({

    apiKey: process.env.GEMINI_API_KEY
});





async function generateInterviewReport({ jobDescription, resume, selfDescription }) {

    const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
`

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: z.toJSONSchema(reportSchema),
            }
        });


        return JSON.parse(response.text);
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error
    }
}


async function generateResume({ resume, report }) {

    const prompt = `
You are an expert professional resume writer and resume designer.

Your task is to generate an improved, ATS-friendly, professional one-page resume
for the candidate using the existing resume and interview analysis provided below.

EXISTING RESUME:
${resume}

INTERVIEW REPORT:
${JSON.stringify(report)}

OBJECTIVE:
Create a significantly improved version of the candidate's resume that is
tailored toward the target job description and addresses relevant weaknesses
identified in the interview report.

CONTENT RULES:
- Preserve all factual information from the original resume.
- Improve wording, structure, clarity, grammar, and impact.
- Prioritize skills and experience relevant to the target job.
- Use strong action verbs and concise achievement-oriented bullet points.
- Remove unnecessary repetition and weak wording.
- Keep the resume highly ATS-friendly.
- Do not add unnecessary sections.
- Do not create fake achievements, metrics, projects, companies, internships,
  certifications, education, responsibilities, or technologies.

STRICT ANTI-HALLUCINATION RULE:
- Never invent work experience.
- Never invent companies.
- Never invent internships.
- Never invent projects.
- Never invent education.
- Never invent certifications.
- Never invent achievements or statistics.
- Never claim that the candidate has a technology unless it is supported by
  the existing resume or interview report.
- You may improve the presentation and wording of existing information,
  but you must not change its factual meaning.

ONE-PAGE REQUIREMENT:
- The COMPLETE resume MUST fit on exactly ONE standard US Letter page.
- Do not generate a second page.
- Keep the content dense but readable.
- Prioritize the most relevant information if space is limited.
- Do not unnecessarily repeat information.
- Keep bullet points concise.
- Use approximately 0.45-0.6 inch page margins.
- Use compact but readable typography.
- Use a clean single-column layout.
- Do not use tables for the main resume structure.
- Do not use multiple columns.
- Do not use graphics, profile photos, icons, skill bars, charts, progress
  indicators, or decorative elements.
- Do not use excessive colors.
- Use primarily black/dark text on a white background.

DESIGN STYLE:
Create a modern, minimal, clean software-engineering resume.

The visual hierarchy should be:

1. Candidate name — large and bold
2. Contact information — compact line directly below the name
3. Section headings — bold, uppercase or small-caps style with subtle spacing
4. Content — compact and highly readable
5. Projects and experience — strong project titles followed by concise bullets

Use:
- White background
- Black/dark gray text
- One subtle accent color at most
- Professional typography
- Consistent spacing
- Thin section separators where appropriate
- No unnecessary decoration
- No large empty spaces

HEADER:
At the top of the resume, display:

Candidate Name
Phone | Email | GitHub | LinkedIn | Codolio | LeetCode

IMPORTANT LINKS RULE:
If the original resume contains links or identifiable URLs for GitHub,
LinkedIn, Codolio, LeetCode, portfolio, or other professional profiles,
make them clickable using HTML <a href="..."> elements.

Do NOT invent URLs.

If the original resume only contains the platform name but no URL,
do not fabricate a URL. Keep the platform name as plain text.

SECTIONS:
Use only the sections that are supported by the original resume.

Preferred order:

HEADER
PROFILE / SUMMARY
EDUCATION
EXPERIENCE (if available)
PROJECTS
SKILLS
CERTIFICATIONS
LEADERSHIP & ACTIVITIES

You may change the order slightly if doing so improves relevance for the
target job, but keep the resume one page.

PROJECTS:
For each project:
- Display project name prominently.
- Display technology stack compactly.
- Display dates when available.
- Use 2-4 concise bullet points.
- Rewrite bullets to emphasize technical impact, responsibilities, and
  relevant technologies.
- Prioritize projects relevant to the target job.

SKILLS:
Organize skills into compact categories such as:
Programming
Frameworks
Databases
Authentication / Cloud
Tools
Core Subjects

Do not add skills that are not supported by the original resume.

ATS REQUIREMENTS:
- Use standard section names.
- Use normal text rather than images for all important information.
- Avoid decorative symbols that could confuse ATS systems.
- Use semantic HTML.
- Keep important keywords naturally incorporated into the resume.
- Tailor keywords toward the target job description without keyword stuffing.

HTML REQUIREMENTS:
Return ONLY a complete HTML document.

The HTML must include:
<!DOCTYPE html>
<html>
<head>
...
</head>
<body>
...
</body>
</html>

Include all required CSS inside a single <style> tag in the HTML.

The HTML must be directly usable by Puppeteer to generate a PDF.

Use print-friendly CSS including:
@page {
  size: Letter;
  margin: 0;
}

body {
  margin: 0;
  background: white;
}

The resume should render correctly when Puppeteer uses:
page.pdf({
  format: 'Letter',
  printBackground: true
});

IMPORTANT:
- Do not return Markdown.
- Do not wrap the HTML in \`\`\`html.
- Do not provide explanations.
- Do not provide comments outside the HTML.
- Return ONLY the complete HTML document.
- Want the resume to strictly fit in 1 page only do not go to 2nd page, nut notice it should completely fill the oafe no white spaces should be left at bottom 
`;
    try {

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "text/plain"

            }
        })


        const html = response.text;


        // const browser = await puppeteer.launch();

        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage'
            ]
        });


        const page = await browser.newPage();

        await page.setContent(html, {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });

        // Convert HTML to PDF
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20px',
                bottom: '20px',
                left: '20px',
                right: '20px'
            }
        });

        await browser.close();

        return pdf;

    } catch (error) {

        console.error("Resume Error:", error);
        throw error;

    }


}

module.exports = { generateInterviewReport, generateResume }; 