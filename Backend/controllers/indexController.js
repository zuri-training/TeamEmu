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