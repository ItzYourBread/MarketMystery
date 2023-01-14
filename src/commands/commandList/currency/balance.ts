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

			const networth = Data.cash + Data.bank.cash;

			let balance = {
				title: `${user.username}'s Balance`,
				color: Number(config.colour.primary),
				fields: [],
				timestamp: new Date
			};

			if (Data.cash > 1) {
				balance.fields.push({
					name: "Cash:",
					value: `\`${Data.cash.toLocaleString()}\` `,
					inline: false,
				})
			}

			if (Data.bank.stats && Data.bank.cash > 1) {
				balance.fields.push({
					name: "Bank:",
					value: `\`${Data.bank.cash.toLocaleString()}\` `,
					inline: false
				})
			}

			if (networth > 1) {
				balance.fields.push({
					name: "bank:",
					value: `\`${networth.toLocaleString()}\` `,
					inline: false
				})
			}

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
