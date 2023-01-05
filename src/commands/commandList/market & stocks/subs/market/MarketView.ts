import { Client, CommandInteraction } from 'eris';
import { Stock } from '../../../../../database/stock';
import * as config from '../../../../../config.json';

export async function MarketView(
    client: Client,
    interaction: CommandInteraction
) {
    try {
        await interaction.defer();
        const stocks = await Stock.find();

        let list = {
            title: 'Stock Market View',
            color: Number(config.colour.primary),
            description: 'Here is a list of all the stocks in the market:',
            fields: [],
            footer: {
                text: 'Stocks',
            },
            timestamp: new Date(),
        };
        for (const stock of stocks) {
            list.fields.push({
                name: `${stock.ticker} (${stock.company})`,
                value: `Price: $${stock.price.toLocaleString()}\nShares: ${stock.shares.toLocaleString()}`,
                inline: true,
            });
        }
        await interaction.editOriginalMessage({ embeds: [list] });
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
