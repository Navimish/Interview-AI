const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/user.route')
const interviewRoute = require('./routes/interview.route')
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))

app.use('/api/auth',userRoute);
app.use('/api/interview',interviewRoute);










module.exports = app;