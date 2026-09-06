const express = require('express')
const router = express.Router();

const interviewController = require('../controllers/interviewReport.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const upload = require('../middlewares/upload.middleware')


router.post('/',authMiddleware,upload.single('resume'),interviewController.interviewReport )

router.get('/reports',authMiddleware,interviewController.interviewReportsByUser)
router.get('/improved-resume/:interviewID',  authMiddleware,interviewController.newResume)
router.get('/:interviewID',authMiddleware,interviewController.interviewReportById)





module.exports = router;