import { Client, CommandInteraction } from 'eris';
import { Stock } from '../../../../../database/stock';
import * as config from '../../../../../config.json';

export async function StockView(
    client: Client,
    interaction: CommandInteraction
) {
    try {
        await interaction.defer();
        const user = interaction.member;
        const ticker = (interaction.data.options[0] as any).options[0].value;
        const stock = await Stock.findOne({ ticker: ticker });

        let data = {
            color: Number(config.colour.primary),
            title: `${stock.company} (${stock.ticker})`,
            description: `**Industry:** ${stock.industry}`,
            fields: [
                {
                    name: 'Price',
                    value: `$${stock.price.toLocaleString()}`,
                    inline: true,
                },
                {
                    name: 'Shares',
                    value: stock.shares.toLocaleString(),
                    inline: true,
                },
            ],
            footer: {
                text: `Stock Information`,
            },
            timestamp: new Date(),
        };
        await interaction.editOriginalMessage({ embeds: [data] });
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
