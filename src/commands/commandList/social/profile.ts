import { Constants, Client, CommandInteraction } from 'eris';
import * as config from '../../../config.json';

export default {
    data: {
        name: 'profile',
        description: 'Amazing profiles',
        usage: '/profile <user>',
        options: [
            {
                name: 'user',
                type: Constants.ApplicationCommandOptionTypes.USER,
                description: 'Select a user',
                required: false,
            },
        ],
    },
    async execute(client: Client, interaction: CommandInteraction) {
        try {
            await interaction.defer();
            const ids =
                interaction.data.options && interaction.data.options[0]
                    ? (interaction.data.options[0] as any).value
                    : interaction.member.id;
            const user = client.users.get(ids);

            let profile = {
                title: `${user.username}'s Profile`,
                color: Number(config.colour.primary),
                description: 'Your beautiful Profile!',
                timestamp: new Date(),
            };
            await interaction.editOriginalMessage({ embeds: [profile] });
        } catch (err) {
            console.error(err);
            await interaction.editOriginalMessage({
                content: 'Something went wrong :(',
            });
            setTimeout(() => {
                interaction.deleteOriginalMessage();
            }, 5000);
            return;
        }
    },
};
