"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
function error(client) {
    client.on('error', function (err) {
        console.error(chalk_1.default.redBright("[Discord API] An error occurred:\n".concat(err)));
    });
    console.log(chalk_1.default.cyanBright('[Listener] Error is loaded'));
}
exports.error = error;
