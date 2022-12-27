import { Constants, Client, CommandInteraction } from 'eris';
import { DailyLoginInfo } from './subs/dailySubs/DailyLoginInfo';
import { DailyLoginReward } from './subs/dailySubs/DailyLoginReward';

export default {
    data: {
        name: 'daily',
        description: 'SubCommands of Daily',
        options: [
            {
                name: 'info',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                description: 'Get daily login information!',
            },
            {
                name: 'login',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                description: 'Get your daily login reward!',
            },
        ],
    },
    async execute(client: Client, interaction: CommandInteraction) {
        if (interaction.data.options[0].name === 'info') {
            DailyLoginInfo(client, interaction);
        } else if (interaction.data.options[0].name === 'login') {
            DailyLoginReward(client, interaction);
        }
    },
};
