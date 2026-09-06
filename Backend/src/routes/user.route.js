const express =  require('express');
const router = express();
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')


router.post('/register', userController.register);
router.post('/login',userController.login)
router.get('/logout',userController.logout)
router.get('/getuser',authMiddleware,userController.get_user)      




module.exports = router;