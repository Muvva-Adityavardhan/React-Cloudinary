// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		googleId: { type: String, required: true },
		displayName: { type: String, required: true },
		email: { type: String, required: true },
		image: { type: String },
		media: [
			{
				public_id: String,
				url: String,
				mediaType: String, // 'image' or 'video'
				createdAt: { type: Date, default: Date.now },
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
