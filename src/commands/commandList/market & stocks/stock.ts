import { Constants, Client, CommandInteraction } from 'eris';
import { StockView } from './subs/stock/StockView';

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
                        choices: [
                            { name: 'Sparkle Systems Inc', value: 'SSI' },
                        ],
                    },
                ],
            },
        ],
    },
    async execute(client: Client, interaction: CommandInteraction) {
        switch (interaction.data.options[0].name) {
            case 'view':
				StockView(client, interaction)
                break;
            default:
                // no cares
                break;
        }
    },
};
