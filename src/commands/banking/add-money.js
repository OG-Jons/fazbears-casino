const {
	ApplicationCommandOptionType,
	EmbedBuilder,
} = require("discord.js");
const User = require("../../models/User");

module.exports = {
	name: "add-money",
	description: "Adds money to a specific user.",
	options: [
		{
			name: "target-user",
			description: "User that gets some fresh money.",
			type: ApplicationCommandOptionType.Mentionable,

		},
		{
			name: "amount",
			description: "How much does the User get.",
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


		if (user.bankBalance > 1000000) {
			return interaction.editReply("You reached the maximum amount!");
		}

		user.bankBalance += amountValue;
		await user.save();

		const targetUserObj = await interaction.guild.members.fetch(targetUserId);

		if (amountValue < 0) {
			const embed = new EmbedBuilder()
			.setColor(0xEF5250)
			.setThumbnail(`${targetUserObj.user.displayAvatarURL({ size: 32, dynamic: true })}`)
			.setTitle(`${targetUserObj.user.tag}`)
			.setDescription(`You can't add a negative balance!`)

		return interaction.editReply({ embeds: [embed] });
		}
//orange #FF8D01
		const embed = new EmbedBuilder()
		.setColor(0x66BB6A)
		.setThumbnail(`${targetUserObj.user.displayAvatarURL({ size: 32, dynamic: true })}`)
		.setTitle(`${targetUserObj.user.tag}`)
		.setDescription(`Added **${amountValue}** 💰 to <@${targetUserObj.user.id}> balance!`)

	interaction.editReply({ embeds: [embed] });

	},
};