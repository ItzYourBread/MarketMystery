import { CommandInteraction } from 'eris';
import { Profile } from '../../../../database/profile';

export async function getDailyReward(interaction: CommandInteraction) {
    // Retrieve the user's current reward day from the database
    const user = interaction.member;
    const Data =
        (await Profile.findOne({ id: user.id })) ||
        new Profile({ id: user.id });
    let rewardDay = Data.daily.count;

    // Increment the reward day, and reset to 1 if it has reached 8
    rewardDay++;
    if (rewardDay > 7) {
        rewardDay = 1;
    }

    // Save the updated reward day back to the database
    Data.daily.count = rewardDay;
    Data.save();

    // Return the appropriate reward based on the current reward day
    switch (rewardDay) {
        case 1:
            return 'You have received a free item!';
        case 2:
            return 'You have received 50 virtual currency!';
        case 3:
            return 'You have received a free premium feature!';
        case 4:
            return 'You have received a discount on your next purchase!';
        case 5:
            return 'You have received a free in-game currency!';
        case 6:
            return 'You have received a random item from the store!';
        case 7:
            return 'You have received a special event ticket!';
        default:
            return 'An error occurred. Please try again later.';
    }
}
