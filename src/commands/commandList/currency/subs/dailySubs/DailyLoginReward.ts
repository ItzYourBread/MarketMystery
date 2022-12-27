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

        const text = await getDailyReward(interaction);

        setTimeout(() => {
            let reward = {
                title: 'Daily Login!!',
                color: Number(config.colour.primary),
                description: text,
                footer: {
                    text: `It's your ${Data.daily.count}!!`,
                },
                timestamp: new Date(),
            };

            interaction.editOriginalMessage({ embeds: [reward] });
        }, 2500);
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
