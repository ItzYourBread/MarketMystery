import { Client, CommandInteraction } from 'eris';
import { Profile } from '../../../../../database/profile';
import { Stock } from '../../../../../database/stock';
import * as config from '../../../../../config.json';

export async function StockLeaderboard(
    client: Client,
    interaction: CommandInteraction
) {
    try {
        await interaction.defer();

        const profiles = await Profile.find();
        const stocks = await Stock.find();

        // Create an object to store the portfolio value of each user
        let portfolioValues: any = {};
        for (const profile of profiles) {
            let value = 0;
            for (const ticker of Object.keys(profile.stock)) {
                const stock = stocks.find(s => s.ticker === ticker);
                if (stock) {
                    value += profile.stock[ticker].shares * stock.price;
                }
            }
            portfolioValues[profile.id] = value;
        }

        // Sort the users by their portfolio value
        const sortedUsers = Object.keys(portfolioValues).sort((a, b) => {
            return portfolioValues[b] - portfolioValues[a];
        });

        // Get the top 10 users and their portfolio value
        const topUsers = sortedUsers.slice(-10);

        // Create a list of fields for the leaderboard embed
        let list: String = "";
        for (let i = 0; i < topUsers.length; i++) {
            const user = client.users.get(topUsers[i]);
            if (user) {
                const value = portfolioValues[topUsers[i]];
				list += `**${i + 1}#** ${user.username} : $${value.toLocaleString()}\n\n`
            }
        }

        // Create and send the leaderboard embed
        let embed = {
            color: Number(config.colour.primary),
            title: 'Stock Market Leaderboard (Global)',
			description: `${list}`,
            footer: {
                text: 'Stock Market',
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
}
