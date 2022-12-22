"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shardReady = void 0;
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
function shardReady(client) {
    client.on('shardReady', function (id) {
        console.log(chalk_1.default.yellowBright("[Shard] ".concat(id, " ready!")));
    });
    console.log(chalk_1.default.cyanBright('[Listener] shardReady is loaded'));
}
exports.shardReady = shardReady;
