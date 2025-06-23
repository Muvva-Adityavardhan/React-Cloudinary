// routes/media.js
const router = require("express").Router();
const upload = require("../config/cloudinary");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

// Upload media
router.post("/upload", authMiddleware, upload.single("media"), async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ msg: "User not found" });
		}

		user.media.push({
			public_id: req.file.filename,
			url: req.file.path,
			mediaType: req.file.mimetype.startsWith("image") ? "image" : "video",
		});

		await user.save();
		res.json(user.media);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server Error");
	}
});

// Get user media
router.get("/gallery", authMiddleware, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ msg: "User not found" });
		}
		res.json(user.media);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
