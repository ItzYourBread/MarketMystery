"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var config = tslib_1.__importStar(require("../../../config.json"));
exports.default = {
    data: {
        name: 'help',
        description: 'Get help!',
        usage: '/help <subcommand>',
        options: [
            {
                name: 'commands',
                type: eris_1.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                description: 'Get list of commands',
            },
            {
                name: 'info',
                type: eris_1.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                description: 'Get some info & about',
            },
        ],
    },
    execute: function (client, interaction) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var commands, info, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4, interaction.defer()];
                    case 1:
                        _a.sent();
                        if (!(interaction.data.options[0].name === 'commands')) return [3, 3];
                        commands = {
                            title: "".concat(client.user.username, "'s Commands"),
                            color: Number(config.colour.primary),
                            description: 'Here is our all commands',
                            fields: [
                                {
                                    name: 'Actions',
                                    value: '`hug`',
                                    inline: false,
                                },
                                {
                                    name: 'Misc',
                                    value: '`ping`',
                                    inline: false,
                                },
                                {
                                    name: 'Utility',
                                    value: '`help`',
                                    inline: false,
                                },
                            ],
                            timestamp: new Date(),
                        };
                        return [4, interaction.editOriginalMessage({ embeds: [commands] })];
                    case 2:
                        _a.sent();
                        return [3, 5];
                    case 3:
                        if (!(interaction.data.options[0].name === 'info')) return [3, 5];
                        info = {
                            title: "".concat(client.user.username, "'s Info"),
                            color: Number(config.colour.primary),
                            description: 'Oh some shit here',
                            timestamp: new Date(),
                        };
                        return [4, interaction.editOriginalMessage({ embeds: [info] })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3, 7];
                    case 6:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [2, interaction.createMessage({
                                content: 'Something went wrong :(',
                                flags: 64,
                            })];
                    case 7: return [2];
                }
            });
        });
    },
};
