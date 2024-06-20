const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	guildId: {
		type: String,
		required: true,
	},
	bankBalance: {
		type: Number,
		default: 2500,
	},
	cashBalance: {
		type: Number,
		default: 0,
	},
});

module.exports = model("User", userSchema);