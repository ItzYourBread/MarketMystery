import { Client, CommandInteraction } from 'eris';
import { Profile } from '../../../database/profile';
import { Stock } from '../../../database/stock';

export default {
    data: {
        name: 'portfolio',
        description: "View your & other's portfolio",
    },
    async execute(client: Client, interaction: CommandInteraction) {
        try {
            await interaction.defer();
            const user = interaction.member;
            const Data =
                (await Profile.findOne({ id: user.id })) ||
                new Profile({ id: user.id });

            if (!Data.stock) {
                await interaction.editOriginalMessage({
                    content: "You don't have any stocks in your portfolio.",
                });
                setTimeout(() => {
                    interaction.deleteOriginalMessage();
                }, 5000);
                return;
            }

            const embeds = [];
            for (const ticker of Object.keys(Data.stock)) {
                const stock = await Stock.findOne({ ticker: ticker });
                const shares = Data.stock[ticker].shares;
                const value = shares * stock.price;

                const embed = {
                    title: `${stock.company} (${ticker})`,
                    description: `Shares: ${shares.toLocaleString()}\nTotal Value: $${value.toFixed(
                        2
                    )}`,
                };
                embeds.push(embed);
            }

            await interaction.editOriginalMessage({ embeds: embeds });
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
