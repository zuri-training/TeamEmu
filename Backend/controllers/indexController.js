const Post = require('../models/PostModel')
const Review = require('../models/Review')
const validator = require('validator')
const {isEmpty} = require('../utils/customFunctions');
const path = require('path')

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

exports.websiteTypes = (req, res) => {
	res.render('websitetype')
}

//sending all posts
exports.getPosts = async(req, res) => {
	try{
		const posts = await Post.find({owner: req.user._id})

		res.render('postsIndex', {posts: posts}) 
	}catch{
		res.status(500).render('error', {message: e.message})
	}
}

exports.submitPost = (req, res, next) => {

	let filename1 = '';
	let filename2 = '';
	let filename3 = '';
	// let filename4 = '';
	// let filename5 = '';
	try{
			
   if(!isEmpty(req.files)) {
	// if(!req.files.image1 || !req.files.image2 || !req.files.image3){
	// 	res.render('error', {message: "All three images are required, please."})
	// }
	   let file1 = req.files.image1
	   let file2 = req.files.image2
	   let file3 = req.files.image3
	//  let file4 = req.files.image4;
	//  let file5 = req.files.image5;

	   
		filename1 = file1.name
		filename2 = file2.name
		filename3 = file3.name
		// filename4 = file4.name;
		// filename5 = file5.name;

	   let uploadDirectory = path.join(__dirname, '../public/uploads/');
	   
	   file1.mv(uploadDirectory+filename1, (err) => {
		   if (err)
			   res.status(500).render('error', {message: err.message});
	   	});
	   file2.mv(uploadDirectory+filename2, (err) => {
		if (err)
			res.status(500).render('error', {message: err.message});
		});
		file3.mv(uploadDirectory+filename3, (err) => {
			if (err)
				res.status(500).render('error', {message: err.message});
		});
		// file4.mv(uploadDirectory+filename4, (err) => {
		// 	if (err)
		// 		res.status(500).render('error', {message: err.message});
		// });
		// file5.mv(uploadDirectory+filename5, (err) => {
		// 	if (err)
		// 		res.status(500).render('error', {message: err.message});
		// });
   }
   const newPost = new Post({
	heroHeadline: req.body.heroHeadline, 
	heroParagraph: req.body.heroParagraph, image1: `https://teamemu.onrender.com/uploads/${filename1}`,
	pageHeadline: req.body.pageHeadline, pageParagraph: req.body.pageParagraph, image2: `https://teamemu.onrender.com/uploads/${filename2}`,
	serviceHeading: req.body.serviceHeading, ourServices: req.body.ourServices, image3: `https://teamemu.onrender.com/uploads/${filename3}`,
	facebook: req.body.facebook, twitter: req.body.twitter, instagram: req.body.instagram,
	footerText: req.body.footerText,
	owner: req.user._id

	// image4: `/uploads/${filename4}`,
	// image5: `/uploads/${filename5}`,
	});
		newPost.save()
	
		res.render('successpage')
	
	}catch(e){
		res.render('error', {message: "All three images are required, please"})
	}
	
	

}

exports.tempage = (req, res) => {
	res.render('tempage')
}

exports.gamers = (req, res) => {
	res.render('gamers')
}

exports.realEstate = (req, res) => {
	res.render('real-estate')
}

exports.getOnePost = (req, res) => {
	const id = req.params.id
	Post.findById(id)
	.then(post => {
		if(!post){
			res.status(404).json({message: "Not post found"})
		}else{
			res.render('onePost', {post: post})
		}
	})
}