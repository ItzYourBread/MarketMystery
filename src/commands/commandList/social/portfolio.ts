import { Constants, Client, CommandInteraction } from 'eris';
import { Profile } from '../../../database/profile';
import { Stock } from '../../../database/stock';
import * as config from '../../../config.json';

let ticker = 'SKYT';

export default {
    data: {
        name: 'portfolio',
        description: "View your & other's portfolio",
		options: [
			{
				name: "user",
				type: Constants.ApplicationCommandOptionTypes.USER,
				description: "Select a user",
				required: false
			}
		]
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

            // Create an empty portfolio object to store the user's stock information
            const portfolio: {
                ticker: string;
				company: string;
                shares: number;
                value: number;
            }[] = [];

            // Iterate over the user's stock data and get the current value of each stock
            for (const ticker in Data.stock) {
                const stock = await Stock.findOne({ ticker: ticker });
                if (stock) {
                    portfolio.push({
                        ticker: ticker,
						company: stock.company,
                        shares: Data.stock[ticker].shares,
                        value: stock.price * Data.stock[ticker].shares,
                    });
                }
            }

            // Calculate the total value of the user's portfolio
            const totalValue = portfolio.reduce(
                (acc, cur) => acc + cur.value,
                0
            );

            // Create the embed message
            let embed = {
                title: `${user.username}'s Portfolio`,
                color: Number(config.colour.primary),
                fields: portfolio.map((stock) => ({
                    name: `${stock.company} (${stock.ticker})`,
                    value: `Shares: ${
                        stock.shares
                    }\nValue: $${stock.value.toLocaleString()}`,
                    inline: true,
                })),
                footer: {
                    text: `Total Portfolio Value: $${totalValue.toLocaleString()}`,
                },
                timestamp: new Date(),
            };

            await interaction.editOriginalMessage({ embeds: [embed] });
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
