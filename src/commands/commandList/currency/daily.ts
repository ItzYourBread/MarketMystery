import { Constants, Client, CommandInteraction } from 'eris';
import { DailyInfo } from './subs/daily/DailyInfo';
import { DailyLogin } from './subs/daily/DailyLogin';

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
                DailyInfo(client, interaction);
                break;
            case 'login':
                DailyLogin(client, interaction);
                break;
            default:
                // no cares
                break;
        }
    },
};
