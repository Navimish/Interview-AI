const mongoose = require('mongoose');




const technicalQuestionsSchema = new mongoose.Schema({

    question : {
        type :String,
        required : [true, "Technical Questions are required"]
        
    },
    intension: {
        type :String,
        required : [true, "Intensions are required"]
        
    },
    answer : {
        type :String,
        required : [true, "Answers are required"]
        
    },
},{
    _id: false
})

const behaviourQuestionsSchema = new mongoose.Schema({

    question : {
        type :String,
        required : [true, "Behavioural Questions are required"]
        
    },
    intension: {
        type :String,
        required : [true, "Intensions are required"]
        
    },
    answer : {
        type :String,
        required : [true, "Answers are required"]
        
    },
},{
    _id: false
})

const skillGapSchema = new mongoose.Schema({

    skill : {
        type : String,
        required : [true, "Skill is required"]
    },
    severity : {
        type : String,
        enum : ['Low', 'Medium', 'High'],
        required : [true, 'Severity is required']
    }
},{
    _id:false
})

const dailyPlanSchema = new mongoose.Schema({

    day : {
        type : Number,
        required : true
    },

    focus : {
        type : String,
        required : true
    },

    tasks : {
        type : [String],
        required : true

    }

},{
    _id:false
})


const ReportSchema = new mongoose.Schema({


    jobDescription : {
        type: String,
        required : [true, "Job Description is required"]
    },

    resume : {
        type : String,
        required : [true, "Resume is required"]
    },

    selfDescription : {
        type : String
    },

    matchScore : {
        type: Number,
        required: true,
        min: 0,
        max : 100
    },

    technicalQuestions : [technicalQuestionsSchema],
    behaviourQuestions : [behaviourQuestionsSchema],
    skillGap : [skillGapSchema],
    dailyPlan : [dailyPlanSchema],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    title: {
        type: String,
        required: [ true, "Job title is required" ]
    }


},{
    timestamps: true
})

const ReportModel = mongoose.model('Interview_Report', ReportSchema);

module.exports = ReportModel;