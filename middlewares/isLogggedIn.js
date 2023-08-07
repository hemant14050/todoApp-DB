exports.isLoggedIn = (req, res, next) => {
    if(req.session.isLoggedIn) {
        next();
    } else {
        res.status(401).json({  
            success: false,
            message: "Unauthorized",
        });
    }
}