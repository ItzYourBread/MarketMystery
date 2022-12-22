import chalk from 'chalk';
import { Client } from 'eris';

export function shardReady(client: Client) {
    client.on('shardReady', (id) => {
        console.log(chalk.yellowBright(`[Shard] ${id} ready!`));
    });
    console.log(chalk.cyanBright('[Listener] shardReady is loaded'));
}
