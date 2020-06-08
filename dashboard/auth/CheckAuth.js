module.exports = async (req, res, next) => {
    if(req.session.user){
	    return next();
    } else {
        let redirectURL = ((req.originalUrl.includes("login") || req.originalUrl === "/") ? "/selector" : req.originalUrl);
        let state = Math.random().toString(36).substring(5);
        req.client.states[state] = redirectURL;
	    return res.redirect(`/api/login?state=${state}`);
    }
};