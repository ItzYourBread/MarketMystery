import { Constants, Client, CommandInteraction } from 'eris';
import { DailyLoginInfo } from './subs/daily/DailyLoginInfo';
import { DailyLoginReward } from './subs/daily/DailyLoginReward';

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
        switch (interaction.data.options[0].name) {
            case 'info':
                DailyLoginInfo(client, interaction);
                break;
            case 'login':
                DailyLoginReward(client, interaction);
                break;
            default:
                // no cares
                break;
        }
    },
};
