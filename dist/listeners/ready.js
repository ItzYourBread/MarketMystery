"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = void 0;
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var stock_1 = require("../utils/stock");
function ready(client) {
    client.on('ready', function () {
        client.editStatus('online', {
            name: 'Stovk Markets!!!',
            type: 0,
        });
        console.log(chalk_1.default.greenBright("[Discord API] ".concat(client.user.username, " is now connected to Discord!")));
        (0, stock_1.StockUpdate)('SKYT');
        (0, stock_1.StockUpdate)('GKYN');
    });
    console.log(chalk_1.default.cyanBright('[Listener] Ready is loaded'));
}
exports.ready = ready;
