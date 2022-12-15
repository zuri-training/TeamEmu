const mongoose = require("mongoose")

const templateSchema = new mongoose.Schema({
	hero_headline: String,
	hero_paragraph: String,
	body_headline: String,
	body_paragraph: String,
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	image1: Buffer,
	image2: Buffer,
	image3: Buffer,
	image4: Buffer,
	image5: Buffer
	
}, {
	timestamps: true
})


const Template = mongoose.model('Template', templateSchema)
module.exports = Template
