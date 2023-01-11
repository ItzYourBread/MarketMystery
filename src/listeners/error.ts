import { Client } from 'eris';
import chalk from 'chalk';

export function error(client: Client) {
    client.on('error', (err) => {
        console.error(
            chalk.redBright(`[Discord API] An error occurred:\n${err}`)
        );
    });
    console.log(chalk.cyanBright('[Listener] Error is loaded'));
}
