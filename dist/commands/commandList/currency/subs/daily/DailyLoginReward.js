"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyLoginReward = void 0;
var tslib_1 = require("tslib");
var profile_1 = require("../../../../../database/profile");
var config = tslib_1.__importStar(require("../../../../../config.json"));
var getDailyReward_1 = require("../../utils/getDailyReward");
function DailyLoginReward(client, interaction) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var user, Data, timeUntilAvailable, cooldown, _a, message, day, reward, err_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 9]);
                    return [4, interaction.defer()];
                case 1:
                    _b.sent();
                    user = interaction.member;
                    return [4, profile_1.Profile.findOne({ id: user.id })];
                case 2:
                    Data = (_b.sent()) ||
                        new profile_1.Profile({ id: user.id });
                    if (!(new Date().getTime() < Data.daily.time)) return [3, 4];
                    timeUntilAvailable = Math.floor((Data.daily.time - Date.now()) / 1000);
                    cooldown = {
                        color: Number(config.colour.danger),
                        description: "You already claimed your daily login reward today!\n\nYour next daily login reward is available in:",
                        fields: [
                            {
                                name: "Time Remaining",
                                value: "<t:".concat(timeUntilAvailable, ":R>"),
                                inline: true,
                            },
                        ],
                        footer: {
                            text: "Daily Login Rewards",
                        },
                        timestamp: new Date(),
                    };
                    return [4, interaction.editOriginalMessage({ embeds: [cooldown] })];
                case 3:
                    _b.sent();
                    setTimeout(function () {
                        interaction.deleteOriginalMessage();
                    }, 15000);
                    return [2];
                case 4: return [4, (0, getDailyReward_1.getDailyReward)(interaction)];
                case 5:
                    _a = _b.sent(), message = _a.message, day = _a.day;
                    reward = {
                        title: 'Daily Login!!',
                        color: Number(config.colour.primary),
                        description: message,
                        footer: {
                            text: "It's your ".concat(day, " day login!!"),
                        },
                        timestamp: new Date(),
                    };
                    return [4, interaction.editOriginalMessage({ embeds: [reward] })];
                case 6:
                    _b.sent();
                    return [3, 9];
                case 7:
                    err_1 = _b.sent();
                    console.error(err_1);
                    return [4, interaction.editOriginalMessage({
                            content: 'Something went wrong :(',
                        })];
                case 8:
                    _b.sent();
                    setTimeout(function () {
                        interaction.deleteOriginalMessage();
                    }, 5000);
                    return [2];
                case 9: return [2];
            }
        });
    });
}
exports.DailyLoginReward = DailyLoginReward;
