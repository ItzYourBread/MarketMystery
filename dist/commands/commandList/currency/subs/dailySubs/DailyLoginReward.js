"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyLoginReward = void 0;
var tslib_1 = require("tslib");
var profile_1 = require("../../../../../database/profile");
var config = tslib_1.__importStar(require("../../../../../config.json"));
var getDailyReward_1 = require("../../utils/getDailyReward");
function DailyLoginReward(client, interaction) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var user, Data, rewardCount, text, reward, err_1;
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
                    Data = (_a.sent()) ||
                        new profile_1.Profile({ id: user.id });
                    rewardCount = Data.daily.count;
                    rewardCount++;
                    if (rewardCount > 7) {
                        rewardCount = 1;
                    }
                    switch (rewardCount) {
                        case 1:
                            return [2, "first"];
                        case 2:
                            return [2, "second"];
                        case 3:
                            return [2, "third"];
                        case 4:
                            return [2, "fourth"];
                        case 5:
                            return [2, "fifth"];
                        case 6:
                            return [2, "sixth"];
                        case 7:
                            return [2, "seventh"];
                    }
                    return [4, (0, getDailyReward_1.getDailyReward)(interaction)];
                case 3:
                    text = _a.sent();
                    reward = {
                        title: 'Daily Login!!',
                        color: Number(config.colour.primary),
                        description: text,
                        footer: {
                            text: "It's your ".concat(rewardCount, " day login!!"),
                        },
                        timestamp: new Date(),
                    };
                    interaction.editOriginalMessage({ embeds: [reward] });
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
