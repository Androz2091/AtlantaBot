const express = require("express"),
	CheckAuth = require("../auth/CheckAuth"),
	router = express.Router();

// Gets profile page
router.get("/", CheckAuth, async function(req, res) {
	res.render("settings", {
		user: req.userInfos,
		translate: req.translate,
		printDate: req.printDate,
		currentURL: `${req.client.config.dashboard.baseURL}/${req.originalUrl}`
	});
});

router.post("/", CheckAuth, async function(req, res){
	const user = await req.client.findOrCreateUser({ id: req.user.id });
	const data = req.body;
	if(data.bio){
		user.bio = data.bio;
	}
	if(data.birthdate){
		if(checkDate(data.birthdate)){
			user.birthdate = checkDate(data.birthdate);
			user.markModified("birthdate");
		}
	}
	await user.save();
	res.redirect(303, "/settings");
});

module.exports = router;

/**
 * @returns {Boolean}
 */
function checkDate(birthdate){
	const [day, month, year] = birthdate;
	if(!day || !month || !year) return false;
	const match = birthdate.match(/\d+/g);
	if (!match) return false;
	const tday = +match[0], tmonth = +match[1] - 1;
	let tyear = +match[2];
	if (tyear < 100){
		tyear += tyear < 50 ? 2000 : 1900;
	}
	const d = new Date(tyear, tmonth, tday);
	if(!(tday == d.getDate() && tmonth == d.getMonth() && tyear == d.getFullYear())) return false;
	if(d.getTime() > Date.now()) return false;
	if(d.getTime() < (Date.now()-2.523e+12)) return false;
	return d;
}