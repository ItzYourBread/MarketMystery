"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyLoginReward = void 0;
var tslib_1 = require("tslib");
var profile_1 = require("../../../../../database/profile");
var config = tslib_1.__importStar(require("../../../../../config.json"));
var getDailyReward_1 = require("../../utils/getDailyReward");
function DailyLoginReward(client, interaction) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var user, Data, whatDay, rewardCount, text, reward, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 7]);
                    return [4, interaction.defer()];
                case 1:
                    _a.sent();
                    user = interaction.member;
                    return [4, profile_1.Profile.findOne({ id: user.id })];
                case 2:
                    Data = (_a.sent()) ||
                        new profile_1.Profile({ id: user.id });
                    whatDay = '';
                    rewardCount = Data.daily.count;
                    rewardCount++;
                    if (rewardCount > 7) {
                        rewardCount = 1;
                    }
                    if (rewardCount === 1) {
                        whatDay = 'first';
                    }
                    else if (rewardCount === 2) {
                        whatDay = 'second';
                    }
                    else if (rewardCount === 3) {
                        whatDay = 'third';
                    }
                    else if (rewardCount === 4) {
                        whatDay = 'fourth';
                    }
                    else if (rewardCount === 5) {
                        whatDay = 'fifth';
                    }
                    else if (rewardCount === 6) {
                        whatDay = 'sixth';
                    }
                    else if (rewardCount === 7) {
                        whatDay = 'seventh';
                    }
                    else {
                        whatDay = 'unknown';
                    }
                    return [4, (0, getDailyReward_1.getDailyReward)(interaction)];
                case 3:
                    text = _a.sent();
                    reward = {
                        title: 'Daily Login!!',
                        color: Number(config.colour.primary),
                        description: text,
                        footer: {
                            text: "It's your ".concat(whatDay, " day login!!"),
                        },
                        timestamp: new Date(),
                    };
                    return [4, interaction.editOriginalMessage({ embeds: [reward] })];
                case 4:
                    _a.sent();
                    return [3, 7];
                case 5:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [4, interaction.editOriginalMessage({
                            content: 'Something went wrong :(',
                        })];
                case 6:
                    _a.sent();
                    setTimeout(function () {
                        interaction.deleteOriginalMessage();
                    }, 5000);
                    return [2];
                case 7: return [2];
            }
        });
    });
}
exports.DailyLoginReward = DailyLoginReward;
