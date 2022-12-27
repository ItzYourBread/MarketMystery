"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyLoginReward = void 0;
var tslib_1 = require("tslib");
var profile_1 = require("../../../../../database/profile");
var config = tslib_1.__importStar(require("../../../../../config.json"));
var getDailyReward_1 = require("../../utils/getDailyReward");
function DailyLoginReward(client, interaction) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var user, Data_1, text_1, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 6]);
                    return [4, interaction.defer()];
                case 1:
                    _a.sent();
                    user = interaction.member;
                    return [4, profile_1.Profile.findOne({ id: user.id })];
                case 2:
                    Data_1 = (_a.sent()) ||
                        new profile_1.Profile({ id: user.id });
                    return [4, (0, getDailyReward_1.getDailyReward)(interaction)];
                case 3:
                    text_1 = _a.sent();
                    setTimeout(function () {
                        var reward = {
                            title: 'Daily Login!!',
                            color: Number(config.colour.primary),
                            description: text_1,
                            footer: {
                                text: "It's your ".concat(Data_1.daily.count, "!!"),
                            },
                            timestamp: new Date(),
                        };
                        interaction.editOriginalMessage({ embeds: [reward] });
                    }, 2500);
                    return [3, 6];
                case 4:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [4, interaction.editOriginalMessage({
                            content: 'Something went wrong :(',
                        })];
                case 5:
                    _a.sent();
                    setTimeout(function () {
                        interaction.deleteOriginalMessage();
                    }, 5000);
                    return [2];
                case 6: return [2];
            }
        });
    });
}
exports.DailyLoginReward = DailyLoginReward;
