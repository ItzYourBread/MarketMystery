import { Client, CommandInteraction } from 'eris';
import { Stock } from '../../../../../database/stock';
import { Profile } from '../../../../../database/profile';
import * as config from '../../../../../config.json';

function decreasedPercentage(currentPrice: number, shares: number) {
    const sellPrice = currentPrice * shares;
    let decreasePercentage = 0;

    if (sellPrice > 100000) {
        decreasePercentage = 0.1;
    } else if (sellPrice > 50000) {
        decreasePercentage = 0.06;
    } else if (sellPrice > 10000) {
        decreasePercentage = 0.03;
    } else {
        decreasePercentage = 0.01;
    }

    return sellPrice - sellPrice * decreasePercentage;
}

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
                    text: 'Stock Sell Cancelled',
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

        const sellPrice = stock.price;
		const dropPercent = decreasedPercentage(sellPrice, amount);

        Data.cash += sellPrice;
        Data.stock[ticker].shares -= amount;
        Data.save();

        stock.shares += amount;
        stock.price -= dropPercent;
        stock.save();

        const success = {
            color: Number(config.colour.primary),
            title: 'Stock Sell Successful',
            description: `You have successfully sold \`${amount.toLocaleString()}\` shares of **${ticker}** for a total of \`$${sellPrice.toLocaleString()}\`.`,
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
