const {
	ApplicationCommandOptionType,
	EmbedBuilder,
} = require("discord.js");
const User = require("../../models/User");

module.exports = {
	name: "remove-money",
	description: "Adds money to a specific user.",
	options: [
		{
			name: "target-user",
			description: "Remove money from User.",
			type: ApplicationCommandOptionType.Mentionable,

		},
		{
			name: "amount",
			description: "How much to remove from User.",
			type: ApplicationCommandOptionType.Integer,

		},
	],

	callback: async (client, interaction) => {
		await interaction.deferReply();

		const amountValue = interaction.options.getInteger("amount");
		const targetUserId = interaction.options.get("target-user").value;

		let user = await User.findOne({
			userId: targetUserId,
			guildId: interaction.guild.id,
		}).exec();

        console.log(user)



		user.bankBalance -= amountValue;
		await user.save();

		const targetUserObj = await interaction.guild.members.fetch(targetUserId);

		if (amountValue < 0) {
			const embed = new EmbedBuilder()
			.setColor(0xEF5250)
			.setThumbnail(`${targetUserObj.user.displayAvatarURL({ size: 32, dynamic: true })}`)
			.setTitle(`${targetUserObj.user.tag}`)
			.setDescription(`You can't remove a negative balance!`)

		return interaction.editReply({ embeds: [embed] });
		}
		
		const embed = new EmbedBuilder()
		.setColor(0x66BB6A)
		.setThumbnail(`${targetUserObj.user.displayAvatarURL({ size: 32, dynamic: true })}`)
		.setTitle(`${targetUserObj.user.tag}`)
		.setDescription(`Removed **${amountValue}** 💰 from <@${targetUserObj.user.id}> balance!`)

	interaction.editReply({ embeds: [embed] });
	},
};