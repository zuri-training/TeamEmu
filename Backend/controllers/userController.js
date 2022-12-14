const User = require("../models/userModel");
const PasswordReset = require("../models/PasswordReset")

const bcrypt = require("bcryptjs");
const passport = require("passport")
const validator = require("validator");
const nodemailer = require("nodemailer")
const {v4: uuidv4} = require("uuid");

//nodemailer
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD
	},
	tls: {
		rejectUnauthorized: false
	}
})

//get login page
exports.getLogin = (req, res) => {
	try{
		res.status(200).render("login")
	}catch(e){
		res.status(500).json({message: "Internal server error..."})
	}
}

//get registeration page
exports.getRegister = (req, res) =>{ 
	try{
		res.status(200).render("signUp")
	}catch(e){
		res.status(500).json({message: "Internal server error..."})
	}
}


//register user
exports.registerUser = (req, res) => {
	const {firstName, lastName, email, officeAddress, typeOfBusiness, password, password2} = req.body

	let errors = []
	if(!firstName || !lastName || !email || !officeAddress || !typeOfBusiness || !password || !password2){
		errors.push({msg: "Please, all fields are required."})
	}

	if(password !== password2){
		errors.push({msg: "Passwords do not match."})
	}

	if(!validator.isEmail(email)){
		errors.push({msg: "Email is invalid."})
	}

	if(password.length < 6){
		errors.push({msg: "Password must be at least 6 characters."})
	}

	if(errors.length > 0){
		res.status(200).render("signUp", {
			errors,
			firstName,
			lastName,
			email,
			officeAddress,
			typeOfBusiness,
			password,
			password2
	})
	}
	else{
		User.findOne({email})
		.then(user => {
			if(user){
				errors.push({msg: "Email already exists."})
				res.status(200).render("signUp", {
					errors,
					firstName,
					lastName,
					email,
					officeAddress,
					typeOfBusiness,
					password,
					password2
			})
			} 
			else{
				const newUser = new User({		
					firstName,
					lastName,
					email,
					officeAddress,
					typeOfBusiness,
					password,
				})
		
				bcrypt.hash (newUser.password, 8, (err, hash) => {
					if(err) throw err
					newUser.password = hash
					newUser.save()
					.then(() => {
						//Here, registration is successful and they are carried to the LOG IN PAGE!!
						req.flash('success_msg', "Registration successful, you can now log in.")
						res.redirect("/users/login")
					})
					.catch((err) => {
						res.status(500).json({
							status: 'FAILED',
							message: "An error occured while saving user account."
						})
					})
				})
			}
		})
		.catch((err) => {
			res.status(500).json({
				status: 'FAILED',
				message: "An error occured while checking for existing user."
			})
		})
	}
}


//forgot password
exports.forgotPassword = (req, res) => {
	try{
		res.status(200).render("forgotPassword")
	}catch(e){
		res.status(500).json({message: "Internal server error..."})
	}
}


//request password reset
exports.requestPasswordRequest = async (req, res) => {
	const {email} = req.body
	const redirectUrl = "http://localhost:3000/"
	try{
		if(!email){
			throw new Error('Please, input your email...')
		}
		const data = await User.findOne({email})
		if(!data){
			req.flash('success_msg', `A "reset password" mail should be received shortly, if entered email was previously registered.`)	
			res.redirect("/users/forgotPassword")
		}
		else{
			sendResetEmail(data, redirectUrl, res, req)
		}
	}catch(err){
		req.flash('error', err.message)
		res.status(500).redirect("/users/forgotPassword")
	}
}

const sendResetEmail = ({_id, email}, redirectUrl, res, req) => {
	const resetString = uuidv4() + _id
	PasswordReset.deleteMany({ userId: _id})
	.then(result => {
		//reset records deleted successfully
		//next send the email

		const mailOptions = {
			from: process.env.EMAIL,
			to: email,
			subject: "Password Reset",
			html: `<p>Forgotten your password?</p>
				   <p>To reset it, use the link below </p>
				<p>This link <b>expires in 60 minutes</b></p>
				<p>Click <a href=${redirectUrl + "users/resetPassword/" + _id +"/" + resetString}>here</a> to proceed.</p>`
		};

		//hashing the resetString
		bcrypt.hash(resetString, 8, (err, hashedResetString) => {
			if(err){
				res.status(500).json({
					status: 'FAILED',
					message: "Error occured while hashing the resetString."
				})		
			}
			else if(hashedResetString){
				//set values in password reset collection
				const newPasswordReset = new PasswordReset({
					userId: _id,
					resetString: hashedResetString,
					createdAt: Date.now(),
					expiresAt: Date.now() + 3600000,
				})

				newPasswordReset.save()
				.then(() => {
					transporter.sendMail(mailOptions)
					.then(() => {
						req.flash('success_msg', `A "reset password" mail should be received shortly, if entered email was previously registered.`)	
						res.redirect("/users/forgotPassword")
					})
					.catch((err) => {
						req.flash('error', `Internal server error, please try again...`)	
						res.status(500).redirect("/users/forgotPassword")
					})
				})
				.catch((err) => {
					req.flash('error', `Internal server error, please try again...`)	
					res.status(500).redirect("/users/forgotPassword")
				})
			}
		}) 
	})
	.catch((err) => {
		req.flash('error', `Internal server error, please try again...`)	
		res.status(500).redirect("/users/forgotPassword")
	})
}

//rendering resetPassword page
exports.renderResetPassword = (req, res) => {
	let {userId, resetString} = req.params
	res.render('resetPassword', {userId, resetString})
}


//post reset password
exports.postResetPassword = (req, res) => {
	let {userId, resetString, newPassword, confirmNewPassword} = req.body

	let errors = []
	if(!newPassword || !confirmNewPassword){
		errors.push({msg: "Fill in both fields."})
	}
	if( newPassword !== confirmNewPassword){
		errors.push({msg: "Passwords do not match!"})
	}
	if(newPassword.length < 6){
		errors.push({msg: "Password requires a minimum of 6 characters."})
	}
	if(errors.length > 0){
		res.render("resetPassword", {
			errors,
			userId,
			resetString
		})
	}else{
		PasswordReset.findOne({userId})
		.then((result) => {
			if(result){
				const {expiresAt} = result
				const hashedResetString = result.resetString

				if(expiresAt < Date.now()){
					PasswordReset.deleteOne({userId})
					.then(() => {
						res.render("error", {message: "Reset password link has expired. Re-do this process."})
					})
					.catch((err) => {
						res.status(500).render("error", {message: "Internal server error :("})
					})
				}
				else{
					bcrypt.compare(resetString, hashedResetString, (err, positive) => {
						if(err){
							res.status(500).render("error", {message: "Internal server error :("})
						}
						else if(positive){
	
							bcrypt.hash(newPassword, 8, (err, hashedNewPassword) => {
								if(err){
									return res.status(500).render("error", {message: "Internal server error :("})
								}
	
							User.updateOne({_id: userId}, {password: hashedNewPassword})	
								.then(() => {
									PasswordReset.deleteOne({userId})
									.then(() => {
										req.flash('success_msg', "Your password has been reset successfully.")
										res.redirect("/users/login")
									})
									.catch((err) => {
										res.status(500).render("error", {message: "Internal server error :("})
									})
								})
								.catch((err) => {
									res.status(500).render("error", {message: "Internal server error :("})
								})
							})
						}
						else{
							res.render("error", {message: "Reset string is invalid."})
						}
					})	
				}
			}
			else{
				res.render("error", {message: "Password reset request not found, please request for another..."})
			}
		})
		.catch((err) => {
			res.status(500).render("error", {message: "Internal server error :("})
		})
	}
}

//login user
exports.loginUser = (req, res, next) => {
	passport.authenticate("local", {
		successRedirect: "/dashboard",
		failureRedirect: "/users/login",
		failureFlash: true
	})(req, res, next);
}

//logout user
exports.logoutUser = (req, res) => {
	req.logout((err) => {
		if(err){
			return res.status(500).render("error", {message: "Internal server error..."})
		}
	})
	req.flash("success_msg", "You are logged out")
	res.redirect("/users/login")
}