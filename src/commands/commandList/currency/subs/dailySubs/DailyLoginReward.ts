import { Constants, Client, CommandInteraction } from 'eris';
import { Profile } from '../../../../../database/profile';
import * as config from '../../../../../config.json';
import { getDailyReward } from '../../utils/getDailyReward';

export async function DailyLoginReward(
    client: Client,
    interaction: CommandInteraction
) {
    try {
        await interaction.defer();
        const user = interaction.member;
        const Data =
            (await Profile.findOne({ id: user.id })) ||
            new Profile({ id: user.id });

        let whatDay = '';

        let rewardCount = Data.daily.count;

        rewardCount++;
        if (rewardCount > 7) {
            rewardCount = 1;
        }

        if (rewardCount === 1) {
            whatDay = 'first';
        } else if (rewardCount === 2) {
            whatDay = 'second';
        } else if (rewardCount === 3) {
            whatDay = 'third';
        } else if (rewardCount === 4) {
            whatDay = 'fourth';
        } else if (rewardCount === 5) {
            whatDay = 'fifth';
        } else if (rewardCount === 6) {
            whatDay = 'sixth';
        } else if (rewardCount === 7) {
            whatDay = 'seventh';
        } else {
            whatDay = 'unknown';
        }

        const text = await getDailyReward(interaction);

        let reward = {
            title: 'Daily Login!!',
            color: Number(config.colour.primary),
            description: text,
            footer: {
                text: `It's your ${whatDay} day login!!`,
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
