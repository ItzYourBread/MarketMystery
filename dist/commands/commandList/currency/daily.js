"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var DailyLoginInfo_1 = require("./subs/dailySubs/DailyLoginInfo");
var DailyLoginReward_1 = require("./subs/dailySubs/DailyLoginReward");
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
                if (interaction.data.options[0].name === 'info') {
                    (0, DailyLoginInfo_1.DailyLoginInfo)(client, interaction);
                }
                else if (interaction.data.options[0].name === 'login') {
                    (0, DailyLoginReward_1.DailyLoginReward)(client, interaction);
                }
                return [2];
            });
        });
    },
};
