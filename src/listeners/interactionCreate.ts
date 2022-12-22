import { Client, CommandInteraction } from 'eris';
import { commands } from '../commands/Command';
import chalk from 'chalk';

export function interactionCreate(client: Client) {
    client.on('interactionCreate', async (interaction: CommandInteraction) => {
        if (interaction instanceof CommandInteraction) {
            for (let slashCommand of commands) {
                if (slashCommand.name === interaction.data.name) {
                    await slashCommand.execute(client, interaction);
                    break;
                }
            }
        }
    });
    console.log(chalk.cyanBright('[Listener] interactionCreate is loaded'));
}
