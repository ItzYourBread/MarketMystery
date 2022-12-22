import { Constants, Client, CommandInteraction } from 'eris';

export default {
    data: {
        name: 'hug',
        description: 'Hug someone!',
        usage: '/hug {user}',
        options: [
            {
                name: 'user',
                type: Constants.ApplicationCommandOptionTypes.USER,
                description: 'Select a user',
                required: true,
            },
        ],
    },
    async execute(client: Client, interaction: CommandInteraction) {
        try {
			await interaction.defer();
			const user = (interaction.data.options[0] as any).value;

			let hug = {
				title: `${interaction.member.username} & ${user}`
			}
			await interaction.editOriginalMessage({ embeds: [hug]})
			
        } catch (err) {
            console.error(err);
            return interaction.createMessage({
                content: 'Something went wrong :(',
                flags: 64,
            });
        }
    },
};
