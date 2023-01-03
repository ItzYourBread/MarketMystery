import { Client, CommandInteraction } from 'eris';
import { Profile } from '../../../../../database/profile';
import * as config from '../../../../../config.json';

export async function DailyInfo(
    client: Client,
    interaction: CommandInteraction
) {
    try {
        await interaction.defer();
        const user = interaction.member;
        const Data =
            (await Profile.findOne({ id: user.id })) ||
            new Profile({ id: user.id });
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
