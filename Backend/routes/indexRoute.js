const router = require("express").Router()
const {forwardAuthenticated, ensureAuthenticated} = require("../middleware/auth")
const {welcomePage, dashboard, editWebsite, 
	generalSettings, dashboardMedia, review,
	templates, websiteTypes, getPosts, submitPost,
	tempage, gamers, realEstate, getOnePost,
	admin, deletePost, doc, template,
	submitPost2, getTwoPost, editWebsite2,
	gamers5, realEstate5} = require("../controllers/indexController")

router.get("/", forwardAuthenticated, welcomePage)
router.get("/dashboard", ensureAuthenticated, dashboard)
router.get('/editWebsite', ensureAuthenticated, editWebsite )
router.get('/editWebsite2', ensureAuthenticated, editWebsite2 )
router.get('/generalSettings', ensureAuthenticated, generalSettings)
router.get('/dashboardMedia', ensureAuthenticated, dashboardMedia)
router.get('/templates', templates)
router.get('/websiteType', websiteTypes)
router.post('/review', review)
router.get('/posts', ensureAuthenticated, getPosts)
router.post('/posts/create', ensureAuthenticated, submitPost)
router.post('/posts/create2', ensureAuthenticated, submitPost2)
router.get('/posts/:id',  getOnePost)
router.get('/posts/:id',  getTwoPost)
router.get('/tempage', tempage)
router.get('/gamers', ensureAuthenticated, gamers)
router.get('/gamers5', gamers5)
router.get('/realEstate', ensureAuthenticated, realEstate)
router.get('/realEstate5', realEstate5)
router.get('/admin', ensureAuthenticated, admin)
router.post('/deletePost/:id', ensureAuthenticated, deletePost)
router.get('/doc', doc)
router.get('/template', template)
module.exports = router;