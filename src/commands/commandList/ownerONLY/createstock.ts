import { Constants, Client, CommandInteraction } from 'eris';
import { Stock } from '../../../database/stock';

export default {
    data: {
        name: 'createstock',
        description: 'create new stocks',
        options: [
            {
                name: 'ticker',
                type: Constants.ApplicationCommandOptionTypes.STRING,
                description: 'Ticker name please',
                required: true,
            },
            {
                name: 'company',
                type: Constants.ApplicationCommandOptionTypes.STRING,
                description: 'Company name please',
                required: true,
            },
            {
                name: 'industry',
                type: Constants.ApplicationCommandOptionTypes.STRING,
                description: 'industry type please',
                required: true,
            },
            {
                name: 'price',
                type: Constants.ApplicationCommandOptionTypes.NUMBER,
                description: 'price please',
                required: true,
            },
            {
                name: 'shares',
                type: Constants.ApplicationCommandOptionTypes.NUMBER,
                description: 'Shares count please',
                required: true,
            },
        ],
    },
    async execute(client: Client, interaction: CommandInteraction) {
        try {
            await interaction.defer();

            var options = interaction.data.options;

            const tickerOPT = (options[0] as any).value;
            const companyOPT = (options[1] as any).value;
            const industryOPT = (options[2] as any).value;
            const priceOPT = (options[3] as any).value;
            const sharesOPT = (options[4] as any).value;

            const createdStock = await Stock.create({
                ticker: tickerOPT,
                company: companyOPT,
                industry: industryOPT,
                price: priceOPT,
                shares: sharesOPT,
            });
            await interaction.editOriginalMessage({
                content: `Successfully created \`${tickerOPT}\` `,
            });
        } catch (err) {
            console.error(err);
            await interaction.editOriginalMessage({
                content: 'Something went wrong or maybe its already created!',
            });
            setTimeout(() => {
                interaction.deleteOriginalMessage();
            }, 5000);
            return;
        }
    },
};
