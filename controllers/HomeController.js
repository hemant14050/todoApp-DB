exports.home = async(req, res) => {
    try {
        if(!req.session.isLoggedIn) {
            res.redirect("/login");
            return;
        }
        res.render("pages/home", {
            data: {
                userName: req.session.userName
            }
        });
        return;

    } catch(err) {
        console.log("Error in Home: ", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}