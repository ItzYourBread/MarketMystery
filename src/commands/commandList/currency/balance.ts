import { Constants, Client, CommandInteraction } from 'eris';
import { Profile } from '../../../database/profile';
import * as config from '../../../config.json';

export default {
    data: {
        name: 'balance',
        description: 'Your balance!',
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
            const Data =
                (await Profile.findOne({ id: user.id })) ||
                new Profile({ id: user.id });

            let load = `Here is your currency balance \`$${Data.cash.toLocaleString}\``;

            if (Data.bank.stats && Data.bank.cash >= 1) {
                load += `\n**Bank:** \`$${Data.bank.cash}\``;
            }

            let balance = {
                title: `${user.username}'s Balance`,
                color: Number(config.colour.primary),
                description: load,
                timestamp: new Date(),
            };

            await interaction.editOriginalMessage({ embeds: [balance] });
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
