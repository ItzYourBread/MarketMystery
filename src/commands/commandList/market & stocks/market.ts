import { Constants, Client, CommandInteraction } from 'eris';
import { MarketView } from './subs/market/MarketView';

export default {
    data: {
        name: 'market',
        description: 'SubCommands of Market',
        options: [
            {
                name: 'view',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                description: 'View all the stock companies',
            },
        ],
    },
    async execute(client: Client, interaction: CommandInteraction) {
        switch (interaction.data.options[0].name) {
            case 'view':
                MarketView(client, interaction);
                break;
            default:
                // no cares
                break;
        }
    },
};
