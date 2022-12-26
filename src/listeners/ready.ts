import { Client } from 'eris';
import chalk from 'chalk';

export function ready(client: Client) {
    client.on('ready', () => {
        client.editStatus('online', {
            name: 'Stovk Markets!!!',
            type: 0,
        });
        console.log(
            chalk.greenBright(
                `[Discord API] ${client.user.username} is now connected to Discord!`
            )
        );
    });
    console.log(chalk.cyanBright('[Listener] Ready is loaded'));
}
