import { Client } from 'eris';
import { listener, command, database } from './utils/index';
import figlet from 'figlet';
import chalk from 'chalk';
import 'dotenv/config';

console.clear();
console.log(
    chalk.greenBright(
        figlet.textSync('MarketMystery.', { horizontalLayout: 'full' })
    )
);

import './api';

const client = new Client(process.env.TOKEN, {
    restMode: true,
    autoreconnect: true,
    firstShardID: 0,
    lastShardID: 0,
    maxShards: 0,
    allowedMentions: {
        everyone: false,
        users: true,
        roles: true,
    },
    intents: ['guilds', 'guildMessages', 'guildMembers', 'guildEmojis'],
});

database.connect();

listener.ready(client);
listener.shardReady(client);
listener.interactionCreate(client);

command.global(client);

client.connect();
