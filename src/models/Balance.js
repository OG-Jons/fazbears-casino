const { Schema, model } = require("mongoose");

const balanceSchema = new Schema({
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

module.exports = model("Balance", balanceSchema);