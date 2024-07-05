const {
	ApplicationCommandOptionType,
	EmbedBuilder,
} = require("discord.js");
const User = require("../../models/User");

module.exports = {
	name: "deposit",
	description: "Deposit money into your bank account.",
	options: [
		{
			name: "amount",
			description: "How much you want to deposit.",
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

		//const member = message.guild.member(user);

		// Check if the user has enough balance to withdraw
		if (user.bankBalance < amountValue) {
			return interaction.editReply("You do not have enough money in your bank account.");
		}
		
		if (amountValue < 0) {
			const embed = new EmbedBuilder()
			.setColor(0xEF5250)
			.setThumbnail(`${userId.user.displayAvatarURL({ size: 32, dynamic: true })}`)
			.setTitle(`${userId.user.tag}`)
			.setDescription(`You can't remove a negative balance!`)

			return interaction.editReply({ embeds: [embed] });
		}

		// Perform the withdrawal
		user.bankBalance -= amountValue;
		user.cashBalance += amountValue;
		await user.save();

		const embed = new EmbedBuilder()
		.setColor(0x66BB6A)
		//.setThumbnail(`${userId.user.displayAvatarURL({ size: 32, dynamic: true })}`)
		.setTitle(`${userId.user.tag}`)
		.setDescription(`Deposited **${amountValue}** in to your Bank💰!`)

		interaction.editReply();
	},
};
