const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true},  (err) => {
	if(err){
		return console.log('An error occured:', err)
	}
	console.log('DB connection on...')
})
