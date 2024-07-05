module.exports = {
	name: "messi",
	description: "Do some Messi",

	callback: async (client, interaction) => {
		await interaction.deferReply();

		const reply = await interaction.fetchReply();

		interaction.editReply(
			`https://media.discordapp.net/attachments/1253287932748501043/1253586345113161759/image.png?ex=667664c3&is=66751343&hm=145f934fa5118c574a59d54b95147e0911086b3d1ba9052894c3e1b3e7d6702e&=&format=webp&quality=lossless&width=525&height=525 https://media.discordapp.net/attachments/1215221645602463766/1253603979615670325/31001-1.jpg?ex=6676752f&is=667523af&hm=31a62df60af9f5bc04bd85e14b66655ab39d12de07acafa4b21f412fd5e472aa&=&format=webp&width=664&height=664 `,
		);
	},
};
