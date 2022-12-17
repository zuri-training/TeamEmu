const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
	heroHeadline: String,
	heroParagraph: String,
	image1: String,

	pageHeadline: String,
	pageParagraph: String,
	image2: String,

	serviceHeading: String,
	image3: String,
	ourServices: String,

	facebook: String,
	twitter: String,
	instagram: String,

	footerText: String,
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
}, {
	timestamps: true
})


const Post = mongoose.model('Post', postSchema)
module.exports = Post