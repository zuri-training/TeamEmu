const router = require("express").Router()
const {forwardAuthenticated, ensureAuthenticated} = require("../middleware/auth")
const {welcomePage, dashboard, editWebsite, generalSettings, dashboardMedia, review} = require("../controllers/indexController")

router.get("/", forwardAuthenticated, welcomePage)
router.get("/dashboard", ensureAuthenticated, dashboard)
router.get('/editWebsite', ensureAuthenticated, editWebsite )
router.get('/generalSettings', ensureAuthenticated, generalSettings)
router.get('/dashboardMedia', ensureAuthenticated, dashboardMedia)
router.post('/review', review)
module.exports = router;