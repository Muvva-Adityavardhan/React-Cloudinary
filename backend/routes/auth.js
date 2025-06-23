// routes/auth.js
const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Auth with Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google auth callback
router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/", session: false }),
	(req, res) => {
		const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
		res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
	}
);

module.exports = router;
