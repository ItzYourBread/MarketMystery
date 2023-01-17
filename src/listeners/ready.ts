import { Client } from 'eris';
import chalk from 'chalk';
import { StockUpdate } from '../utils/stock';

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

        StockUpdate('SKYT');
        StockUpdate('WLMT');
        StockUpdate('ENRG');
        StockUpdate('FINC');
        StockUpdate('REAL');
    });
    console.log(chalk.cyanBright('[Listener] Ready is loaded'));
}
