const Review = require('../models/Review')
const validator = require('validator')

exports.welcomePage = (req, res) => {res.render("index")}

exports.dashboard = (req, res) => {
		res.render("dashboard", {user: req.user})
}

exports.editWebsite = (req, res) => {
	res.render("editWebsite", {user: req.user})
}

exports.generalSettings = (req, res) => {
	res.render("generalSettings")
}

exports.dashboardMedia = (req, res) => {
	res.render("dashboardMedia")
}

exports.review = (req, res) => {
	const {name, email, message} = req.body
	
	let errors = []
	if(!name || !email || !message){
		errors.push({msg: "Please, all fields are required."})
	}

	if(!validator.isEmail(email)){
		errors.push({msg: "Email is invalid."})
	}

	if(errors.length > 0){
		res.render("index", {
			errors,
			name,
			email
	})
	}
	else{
		const newReview = new Review({		
			name,
			email,
			message
		})

		newReview.save()
		.then(() => {
			//Review sent
			req.flash('success_msg', "Thank you for reaching out to us.")
			res.redirect("/")
		})
		.catch((err) => {
			res.status(500).json({
				status: 'FAILED',
				message: "Could not send information."
			})
		})
	}
}

exports.templates = (req, res) => {
	res.render('templates')	
}