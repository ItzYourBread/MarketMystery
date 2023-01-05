import { CommandInteraction } from 'eris';
import { Profile } from '../../../../database/profile';
import moment from 'moment';
import ms from 'ms';

export async function getDailyReward(interaction: CommandInteraction) {
    const user = interaction.member;
    const Data =
        (await Profile.findOne({ id: user.id })) ||
        new Profile({ id: user.id });

    let rewardDay = Data.daily.count;

    rewardDay++;
    if (rewardDay > 7) {
        rewardDay = 1;
    }

    Data.daily.count = rewardDay;
    Data.daily.time = ms('1m') + Number(moment.utc().endOf('day'));
    Data.save();

    let rewardMessage = '';
    let whatDay = '';
    switch (rewardDay) {
        case 1:
            rewardMessage = 'You have received a free item!';
            whatDay = 'first';
            break;
        case 2:
            rewardMessage = 'You have received 50 virtual currency!';
            whatDay = 'second';
            break;
        case 3:
            rewardMessage = 'You have received a free premium feature!';
            whatDay = 'third';
            break;
        case 4:
            rewardMessage =
                'You have received a discount on your next purchase!';
            whatDay = 'fourth';
            break;
        case 5:
            rewardMessage = 'You have received a free in-game currency!';
            whatDay = 'fifth';
            break;
        case 6:
            rewardMessage = 'You have received a random item from the store!';
            whatDay = 'sixth';
            break;
        case 7:
            rewardMessage = 'You have received a special event ticket!';
            whatDay = 'seventh';
            break;
        default:
            rewardMessage = 'An error occurred. Please try again later.';
            whatDay = 'unknown';
            break;
    }

    return { message: rewardMessage, day: whatDay };
}
