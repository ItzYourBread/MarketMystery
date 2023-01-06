import { Client, CommandInteraction } from 'eris';
import { Stock } from '../../../../../database/stock';
import { Profile } from '../../../../../database/profile';
import * as config from '../../../../../config.json';

export async function StockBuy(
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

        const cost = stock.price * amount;
        if (Data.cash < cost) {
            let notenough = {
                color: Number(config.colour.danger),
                title: 'Insufficient Funds',
                description: `You do not have enough funds to make this purchase. You need \`$${cost.toLocaleString()}\` to buy \`${amount.toLocaleString()}\` shares of ${
                    stock.company
                } (${ticker}), but you only have \`$${Data.cash.toLocaleString()}\`.`,
                fields: [
                    {
                        name: 'Options',
                        value: 'You can either: \n\n- Trade some items for high prices to a business man \n- Save up more money and try again later',
                        inline: false,
                    },
                ],
                footer: {
                    text: `Stock Market`,
                },
                timestamp: new Date(),
            };

            await interaction.editOriginalMessage({ embeds: [notenough] });
            setTimeout(() => {
                interaction.deleteOriginalMessage();
            }, 15000);
            return;
        }

        var totalCost = amount * stock.price;
        var totalShares = Data.stock[ticker].shares + amount;

        let success = {
            title: `Purchase Successful!`,
            color: Number(config.colour.primary),
            description: `Congratulations on your successful purchase of ${amount.toLocaleString()} shares in ${
                stock.company
            } (${ticker}). Your portfolio has been updated to reflect your new ownership of these shares. Keep an eye on the market to see how your investment performs, and consider buying or selling at the right times to maximize your profits.`,
            fields: [
                {
                    name: 'Total Cost',
                    value: `$\`${totalCost.toLocaleString()}\` `,
                    inline: true,
                },
                {
                    name: 'New Share Balance',
                    value: `\`${totalShares.toLocaleString()}\` shares`,
                    inline: true,
                },
            ],
            footer: {
                text: 'Stock Market',
            },
            timestamp: new Date(),
        };

        Data.cash -= cost;
        Data.stock[ticker].shares += amount;
        Data.save();

        stock.shares -= amount;
        stock.price += cost;
        stock.save();

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
