module.exports = (req, res, next) => {
    
    if (req.session.authenticated) {
        return next();
    } else {
        const redirectURL = ((req.originalUrl.includes("login") || req.originalUrl === "/") ? "/selector" : req.originalUrl);
        const state = Math.random().toString(36).substring(7);
        req.dashboard.states[state] = redirectURL;
        return res.redirect(`/auth/login?state=${state}`);
    }
};