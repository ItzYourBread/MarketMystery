import { readdirSync } from 'fs';
import chalk from 'chalk';
import { Client } from 'eris';

const commands = [];
export { commands };

export function global(client: Client) {
    client.on('ready', async () => {
        const commandFolders = readdirSync(`./dist/commands/commandList`);
        for (const folder of commandFolders) {
            const commandFiles = readdirSync(
                `./dist/commands/commandList/${folder}`
            ).filter((file) => file.endsWith('.js'));
            for (const file of commandFiles) {
                const slashCommandObject = await import(
                    `./commandList/${folder}/${file}`
                );
                if (slashCommandObject.default.data.name) {
                    console.log(
                        chalk.cyanBright(
                            `[Command] ${slashCommandObject.default.data.name} is loaded`
                        )
                    );
                }
                // await client.createGuildCommand(process.env.SLASH_COMMANDS_GUILD, slashCommandObject.default.data)
                // Use code underneath for global slash commands
                await client.createCommand(slashCommandObject.default.data);
                commands.push({
                    name: slashCommandObject.default.data.name,
                    execute: slashCommandObject.default.execute,
                });
            }
        }
    });
}
