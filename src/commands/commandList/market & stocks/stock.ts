import { Constants, Client, CommandInteraction } from 'eris';
import { StockView } from './subs/stock/StockView';
import { StockBuy } from './subs/stock/StockBuy';
import { StockSell } from './subs/stock/StockSell';
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
            {
                name: 'buy',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                description: 'Buy stock shares',
                options: [
                    {
                        name: 'ticker',
                        type: Constants.ApplicationCommandOptionTypes.STRING,
                        description: 'Choose a ticker please',
                        required: true,
                        choices: StockList,
                    },
                    {
                        name: 'shares',
                        type: Constants.ApplicationCommandOptionTypes.NUMBER,
                        description: 'Amount of shares',
                        required: true,
                    },
                ],
            },
            {
                name: 'sell',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                description: 'Sell stock shares',
                options: [
                    {
                        name: 'ticker',
                        type: Constants.ApplicationCommandOptionTypes.STRING,
                        description: 'Choose a ticker please',
                        required: true,
                        choices: StockList,
                    },
                    {
                        name: 'shares',
                        type: Constants.ApplicationCommandOptionTypes.NUMBER,
                        description: 'Amount of shares',
                        required: true,
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
            case 'buy':
                StockBuy(client, interaction);
                break;
            case 'sell':
                StockSell(client, interaction);
            default:
                // no cares
                break;
        }
    },
};
