const {
	ApplicationCommandOptionType,
	EmbedBuilder,
} = require("discord.js");
const User = require("../../models/User");

module.exports = {
	name: "withdraw",
	description: "Withdraw money from your bank account.",
	options: [
		{
			name: "amount",
			description: "How much you want to withdraw.",
			type: ApplicationCommandOptionType.Integer,
			required: true,
		},
	],

	callback: async (client, interaction) => {
		await interaction.deferReply();

		const amountValue = interaction.options.getInteger("amount");
		const userId = interaction.user.id;
		const guildId = interaction.guild.id;

		// Fetch the user from the database
		let user = await User.findOne({ userId, guildId }).exec();

		// If user does not exist in the database
		if (!user) {
			return interaction.editReply("You do not have an account.");
		}

		// Check if the user has enough balance to withdraw
		if (user.bankBalance < amountValue) {
			return interaction.editReply("You do not have enough money in your bank account.");
		}

		if (amountValue < 0) {
			return interaction.editReply("You can't withdraw a negative Number!");
		}

		// Perform the withdrawal
		user.bankBalance -= amountValue;
		user.cashBalance += amountValue;
		await user.save();

		interaction.editReply(`Withdrew **${amountValue}** 💰 from your Bank!`);
	},
};
