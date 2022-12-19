const express = require("express")
const session = require("express-session")
const expressLayouts = require("express-ejs-layouts")
const port = process.env.PORT || 3000;
const flash = require("connect-flash")
const passport = require("passport")
const indexRouter = require('./routes/indexRoute')
const userRoute = require('./routes/userRoute')
const path = require('path')
const fileUpload = require('express-fileupload') 


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}));

require("./middleware/passport")(passport)


// for jest testing comment the line below: --> require("./db/mongoose") 
require("./db/mongoose")

app.use(expressLayouts) //partners with partials
app.use(fileUpload())
app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs") //for rendering html pages with js


app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true})) //allows any format of POST or PUT req from the client side (JSON, object etc)

app.use(
	session({
		secret: "oluwatobi",
		resave: true,
		saveUninitialized: true
	})
)

app.use(passport.initialize()) //initializing authentication
app.use(passport.session())//authentication with passport or app.use(passport.authenticate("session"))

app.use(flash())

//global variables
app.use(function(req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg')
	res.locals.error = req.flash('error')
	next()
})

app.use("/", indexRouter)
app.use("/users", userRoute)


// for jest testing uncomment the 3 lines below: --> app.listen...
app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})

// for jest testing uncomment the line below: --> module.exports = app 
// module.exports = app