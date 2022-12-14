const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		required: true
	},
	message: String
}, {
	timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review;