"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactionCreate = void 0;
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var command_1 = require("../commands/command");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
function interactionCreate(client) {
    var _this = this;
    client.on('interactionCreate', function (interaction) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _i, commands_1, slashCommand;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(interaction instanceof eris_1.CommandInteraction)) return [3, 4];
                    _i = 0, commands_1 = command_1.commands;
                    _a.label = 1;
                case 1:
                    if (!(_i < commands_1.length)) return [3, 4];
                    slashCommand = commands_1[_i];
                    if (!(slashCommand.name === interaction.data.name)) return [3, 3];
                    return [4, slashCommand.run(client, interaction)];
                case 2:
                    _a.sent();
                    return [3, 4];
                case 3:
                    _i++;
                    return [3, 1];
                case 4: return [2];
            }
        });
    }); });
    console.log(chalk_1.default.cyanBright('[Listener] interactionCreate is loaded'));
}
exports.interactionCreate = interactionCreate;
