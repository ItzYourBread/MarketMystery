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
                description: `You don't have enough shares of **${ticker}** to sell. Please try again with a lower amount.`,
                footer: {
                    text: 'Stock Sell Error',
                },
                timestamp: new Date(),
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

        stock.shares += amount;
        stock.price -= sellPrice;
        stock.save();

        const success = {
            color: Number(config.colour.primary),
            title: 'Stock Sell Successful',
            description: `You have successfully sold ${amount} shares of **${ticker}** for a total of $${sellPrice}.`,
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
        return;
    }
}
