import { Client, CommandInteraction } from 'eris';
import * as config from '../../../config.json';

export default {
    data: {
        name: 'help',
        description: 'Get help!',
    },
    async execute(client: Client, interaction: CommandInteraction) {
        let commands = {
            title: 'Commanda',
            color: Number(config.colour.primary),
        };
        await interaction.createMessage({ embeds: [commands] });
    },
};
