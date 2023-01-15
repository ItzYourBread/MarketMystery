import { Client, CommandInteraction } from 'eris';
import { Stock } from '../../../../../database/stock';
import * as config from '../../../../../config.json';
import { Trend } from '../../../../../utils/trend';
import fetch from 'node-fetch';
import 'dotenv/config';

async function trend(ticker: String) {
    const response = await fetch(
        `http://103.60.13.253:${process.env.PORT}/stock/${ticker}` + process.env.API_KEY
    );
    const data = await response.json();
    return await Trend(data);
}

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
                    name: 'Trend',
                    value: `${await trend(ticker)}`,
                    inline: false,
                },
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
