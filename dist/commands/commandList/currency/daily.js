"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var DailyInfo_1 = require("./subs/daily/DailyInfo");
var DailyLogin_1 = require("./subs/daily/DailyLogin");
exports.default = {
    data: {
        name: 'daily',
        description: 'SubCommands of Daily',
        options: [
            {
                name: 'info',
                type: eris_1.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                description: 'Get daily login information!',
            },
            {
                name: 'login',
                type: eris_1.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                description: 'Get your daily login reward!',
            },
        ],
    },
    execute: function (client, interaction) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (interaction.data.options[0].name) {
                    case 'info':
                        (0, DailyInfo_1.DailyInfo)(client, interaction);
                        break;
                    case 'login':
                        (0, DailyLogin_1.DailyLogin)(client, interaction);
                        break;
                    default:
                        break;
                }
                return [2];
            });
        });
    },
};
