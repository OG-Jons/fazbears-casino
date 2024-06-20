const { ApplicationCommandOptionType } = require("discord.js");
module.exports = {
	name: "coinflip",
	description: "Toss a coin and make a bet!",
	options: [
		{
			name: "bet",
			description: "The amount you want to bet",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
		{
			name: "side",
			description: "The side you want to bet on.",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{ name: "Head", value: "heads" },
				{ name: "Tails", value: "tails" },
			],
		},
	],

	callback: async (client, interaction) => {
		const chosenBet = interaction.options.getString("bet");
		let bet = 0;
		if (chosenBet === "all") {
			bet = 100;
		}
		const choice = interaction.options.getString("choice");
		// Check if the coin flip is started by user with ID 699346480820912179 and if it is, increase odds of getting tails, otherwise always 50/50
		// This is just an example of how you can use the user ID to change the outcome of the command
		const odds = interaction.user.id === "699346480820912179" ? 0.5 : 0.5;
		console.log(odds);
		const result = Math.random() < odds ? "heads" : "tails";
		await interaction.reply(
			"It's " +
			(result === choice ? "correct!" : "incorrect!") +
			" The coin landed on " +
			result +
			". You bet a whopping " + bet + "!",
		);
	},
};
