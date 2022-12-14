
const ensureAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
	return next();
	}
	req.flash('error_msg', 'Please log in to view that resource');
	res.redirect('/users/login');
}
const forwardAuthenticated = function(req, res, next) {
	if (!req.isAuthenticated()) {
	return next();
	}
	res.redirect('/dashboard');      
}



module.exports = {
	ensureAuthenticated,
	forwardAuthenticated
}