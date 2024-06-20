const {
	ApplicationCommandOptionType,
	EmbedBuilder,
} = require("discord.js");
const User = require("../../models/User");

module.exports = {

	name: "balance",
	description: "Show your/someone's balance!",
	options: [
		{
			name: "target-user",
			description: "The user whose balance you want to see.",
			type: ApplicationCommandOptionType.Mentionable,
		},
	],
	callback: async (client, interaction) => {
		await interaction.deferReply();

		const mentionedUserId = interaction.options.get("target-user")?.value;
		const targetUserId = mentionedUserId || interaction.member.id;
		const targetUserObj = await interaction.guild.members.fetch(targetUserId);

		const fetchedUser = await User.findOne({
			userId: targetUserId,
			guildId: interaction.guild.id,
		}).exec();

		if (!fetchedUser) {
			interaction.editReply(
				mentionedUserId
					? `${targetUserObj.user.tag} hasn't created a bank account yet. Try again when they have.`
					: "You don't have any levels yet. Chat a little more and try again.",
			);
			return;
		}

		const allUsers = await User.find({ guildId: interaction.guild.id }).select(
			"-_id userId bankBalance cashBalance",
		).exec();

		allUsers.sort((a, b) => (b.bankBalance + b.cashBalance) - (a.bankBalance + a.cashBalance));

		const currentRank = allUsers.findIndex((user) => user.userId === targetUserId) + 1;


		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle(`${targetUserObj.nickname || targetUserObj.user.globalName}'s balance`)
			.setDescription(`Leaderboard rank: ${currentRank}`)
			.addFields(
				{ name: "Cash", value: `${fetchedUser.cashBalance}`, inline: true },
				{ name: "Bank", value: `${fetchedUser.bankBalance}`, inline: true },
				{ name: "Total", value: `${(fetchedUser.cashBalance + fetchedUser.bankBalance)}`, inline: true },
			);

		interaction.editReply({ embeds: [embed] });
	},
};
