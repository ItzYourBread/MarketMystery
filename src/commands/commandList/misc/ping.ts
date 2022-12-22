import { Client, CommandInteraction } from 'eris';
import * as config from '../../../config.json';

export default {
    data: {
        name: 'ping',
        description: '🏓 Ping Pong',
        usage: '/ping',
    },
    async execute(client: Client, interaction: CommandInteraction) {
        const ping = Date.now() - interaction.createdAt;
        await interaction.createMessage({
            content: `Pong! \`${ping}ms\` `,
        });
    },
};
