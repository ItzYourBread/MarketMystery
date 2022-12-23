import { Constants, Client, CommandInteraction } from 'eris';
import * as config from '../../../config.json';

export default {
    data: {
        name: 'help',
        description: 'Get help!',
        usage: '/help <subcommand>',
        options: [
            {
                name: 'commands',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                description: 'Get list of commands',
            },
            {
                name: 'info',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                description: 'Get some info & about',
            },
        ],
    },
    async execute(client: Client, interaction: CommandInteraction) {
        try {
            await interaction.defer();
            if (interaction.data.options[0].name === 'commands') {
                let commands = {
                    title: `${client.user.username}'s Commands`,
                    color: Number(config.colour.primary),
                    description: 'Here is our all application commands',
                    fields: [
                        {
                            name: 'Social',
                            value: '`profile`',
                            inline: false,
                        },
                        {
                            name: 'Actions',
                            value: '`hug`, `cuddle`',
                            inline: false,
                        },
                        {
                            name: 'Misc',
                            value: '`ping`',
                            inline: false,
                        },
                        {
                            name: 'Utility',
                            value: '`help`',
                            inline: false,
                        },
                    ],
                    timestamp: new Date(),
                };
                await interaction.editOriginalMessage({ embeds: [commands] });
            } else if (interaction.data.options[0].name === 'info') {
                let info = {
                    title: `${client.user.username}'s Info`,
                    color: Number(config.colour.primary),
                    description: 'Oh some shit here',
                    timestamp: new Date(),
                };
                await interaction.editOriginalMessage({ embeds: [info] });
            }
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
    },
};
