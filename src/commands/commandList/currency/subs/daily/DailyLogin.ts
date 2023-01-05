import { Client, CommandInteraction } from 'eris';
import { Profile } from '../../../../../database/profile';
import * as config from '../../../../../config.json';
import { getDailyReward } from '../../utils/getDailyReward';

export async function DailyLogin(
    client: Client,
    interaction: CommandInteraction
) {
    try {
        await interaction.defer();
        const user = interaction.member;
        const Data =
            (await Profile.findOne({ id: user.id })) ||
            new Profile({ id: user.id });

        if (Data.daily.time > Date.now()) {
            const timeUntilAvailable = Math.floor(
                (Data.daily.time - 3000) / 1000
            );

            let cooldown = {
                color: Number(config.colour.danger),
                description: `You already claimed your daily login reward today!\n\nYour next daily login reward is available in:`,
                fields: [
                    {
                        name: `Time Remaining`,
                        value: `<t:${timeUntilAvailable}:R>`,
                        inline: true,
                    },
                ],
                footer: {
                    text: `Daily Login Rewards`,
                },
                timestamp: new Date(),
            };
            await interaction.editOriginalMessage({ embeds: [cooldown] });
            setTimeout(() => {
                interaction.deleteOriginalMessage();
            }, 15000);
            return;
        }

        const { message, day } = await getDailyReward(interaction);

        let reward = {
            title: 'Daily Login!!',
            color: Number(config.colour.primary),
            description: message,
            footer: {
                text: `It's your ${day} day login!!`,
            },
            timestamp: new Date(),
        };

        await interaction.editOriginalMessage({ embeds: [reward] });
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
