const router = require("express").Router();
const {getLogin, getRegister, registerUser, forgotPassword,
	   requestPasswordRequest, renderResetPassword, postResetPassword,
	   loginUser, logoutUser} = require("../controllers/userController")
const {forwardAuthenticated} = require("../middleware/auth");


router.get("/login", forwardAuthenticated, getLogin) 
router.get("/register", forwardAuthenticated, getRegister)
router.post("/register", registerUser) 
router.get("/forgotPassword", forgotPassword)
router.post("/requestPasswordReset", requestPasswordRequest) 
router.get('/resetPassword/:userId/:resetString', renderResetPassword)
router.post('/resetPassword', postResetPassword)
router.post("/login", loginUser) 
router.get("/logout", logoutUser)
module.exports = router;