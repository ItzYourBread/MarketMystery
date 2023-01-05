import { Constants, Client, CommandInteraction } from 'eris';
import { StockView } from './subs/stock/StockView';
import { StockList } from '../../../json/stocks.json';

export default {
    data: {
        name: 'stock',
        description: 'SubCommands of Stock',
        options: [
            {
                name: 'view',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                description: 'View a specific stock',
                options: [
                    {
                        name: 'ticker',
                        type: Constants.ApplicationCommandOptionTypes.STRING,
                        description: 'Choose a ticker please',
                        required: true,
                        choices: StockList,
                    },
                ],
            },
        ],
    },
    async execute(client: Client, interaction: CommandInteraction) {
        switch (interaction.data.options[0].name) {
            case 'view':
                StockView(client, interaction);
                break;
            default:
                // no cares
                break;
        }
    },
};
