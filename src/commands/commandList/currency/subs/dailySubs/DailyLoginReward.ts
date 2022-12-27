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

        let rewardCount = Data.daily.count;

        rewardCount++;
        if (rewardCount > 7) {
            rewardCount = 1;
        }

		switch(rewardCount) {
			case 1:
				return "first";
			case 2:
				return "second";
			case 3: 
				return "third";
			case 4:
				return "fourth"
			case 5:
				return "fifth"
			case 6: 
				return "sixth"
			case 7: 
				return "seventh"
		}

        const text = await getDailyReward(interaction);

        let reward = {
            title: 'Daily Login!!',
            color: Number(config.colour.primary),
            description: text,
            footer: {
                text: `It's your ${rewardCount} day login!!`,
            },
            timestamp: new Date(),
        };

        interaction.editOriginalMessage({ embeds: [reward] });
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
