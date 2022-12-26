"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = void 0;
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
function ready(client) {
    client.on('ready', function () {
        client.editStatus('online', {
            name: 'Stovk Markets!!!',
            type: 0,
        });
        console.log(chalk_1.default.greenBright("[Discord API] ".concat(client.user.username, " is now connected to Discord!")));
    });
    console.log(chalk_1.default.cyanBright('[Listener] Ready is loaded'));
}
exports.ready = ready;
