"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var index_1 = require("./utils/index");
var figlet_1 = tslib_1.__importDefault(require("figlet"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
require("dotenv/config");
console.clear();
console.log(chalk_1.default.greenBright(figlet_1.default.textSync('MarketMystery.', { horizontalLayout: 'full' })));
var client = new eris_1.Client(process.env.TOKEN, {
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
index_1.database.connect();
index_1.listener.ready(client);
index_1.listener.shardReady(client);
index_1.listener.interactionCreate(client);
index_1.command.global(client);
client.connect();
