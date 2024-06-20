const User = require("../../models/User");

module.exports = {

	name: "init-gambling",
	description: "Initialize your gambling addiction!",
	callback: async (client, interaction) => {
		await interaction.deferReply();

		const targetUserId = interaction.member.id;

		const newUser = new User({ userId: targetUserId, guildId: interaction.guild.id });
		try {
			await newUser.save();
		}
		catch (e) {
			interaction.editReply("An error occured, please try again");
		}

		interaction.editReply("Your addiction has been initialized! Try running /balance");

	},
};
