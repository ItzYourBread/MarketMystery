import { Client, CommandInteraction } from 'eris';
import { Stock } from '../../../../../database/stock';
import { Profile } from '../../../../../database/profile';
import * as config from '../../../../../config.json';

export async function StockSell(
    client: Client,
    interaction: CommandInteraction
) {
    try {
        await interaction.defer();
        const user = interaction.member;
        const ticker = (interaction.data.options[0] as any).options[0].value;
        const amount = (interaction.data.options[0] as any).options[1].value;
        const stock = await Stock.findOne({ ticker: ticker });
        const Data =
            (await Profile.findOne({ id: user.id })) ||
            new Profile({ id: user.id });

        if (Data.stock[ticker].shares < amount) {
            const insufficientShares = {
                color: Number(config.colour.danger),
                title: 'Insufficient Shares',
                description: `You attempted to sell ${amount} shares of **${ticker}**, but you only own ${Data.stock[ticker].shares} shares. Please try again with a lower amount.`,
                fields: [
                    {
                        name: 'Total Shares Owned',
                        value: Data.stock[ticker].shares,
                        inline: true,
                    },
                    {
                        name: 'Attempted Sale',
                        value: `${amount} shares of ${ticker}`,
                        inline: true,
                    },
                ],
                timestamp: new Date(),
                footer: {
                    text: 'Stock Sell Cancelled',
                },
            };

            await interaction.editOriginalMessage({
                embeds: [insufficientShares],
            });
            setTimeout(() => {
                interaction.deleteOriginalMessage();
            }, 15000);
            return;
        }

        const sellPrice = stock.price * amount;
        Data.cash += sellPrice;
        Data.stock[ticker].shares -= amount;
        Data.save();

        const drop = stock.price * 0.03 * amount;
        stock.shares += amount;
        stock.price -= drop;
        stock.save();

        const success = {
            color: Number(config.colour.primary),
            title: 'Stock Sell Successful',
            description: `You have successfully sold ${amount.toLocaleString()} shares of ${ticker} for a total of $${sellPrice.toLocaleString()}.`,
            fields: [
                {
                    name: 'Shares Sold',
                    value: amount.toLocaleString(),
                },
                {
                    name: 'Sell Price',
                    value: `$${sellPrice.toLocaleString()}`,
                },
                {
                    name: 'Stock Price Changes',
                    value: `-$${drop.toLocaleString()}`,
                },
            ],
            footer: {
                text: 'Stock Sell Success',
            },
            timestamp: new Date(),
        };

        await interaction.editOriginalMessage({ embeds: [success] });
    } catch (err) {
        console.error(err);
        await interaction.editOriginalMessage({
            content: 'Something went wrong :(',
        });
        setTimeout(() => {
            interaction.deleteOriginalMessage();
        }, 5000);
    }
}
