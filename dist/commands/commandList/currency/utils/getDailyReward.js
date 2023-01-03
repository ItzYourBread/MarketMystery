"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDailyReward = void 0;
var tslib_1 = require("tslib");
var profile_1 = require("../../../../database/profile");
var moment_1 = tslib_1.__importDefault(require("moment"));
var ms_1 = tslib_1.__importDefault(require("ms"));
function getDailyReward(interaction) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var user, Data, rewardDay, rewardMessage, whatDay;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = interaction.member;
                    return [4, profile_1.Profile.findOne({ id: user.id })];
                case 1:
                    Data = (_a.sent()) ||
                        new profile_1.Profile({ id: user.id });
                    rewardDay = Data.daily.count;
                    rewardDay++;
                    if (rewardDay > 7) {
                        rewardDay = 1;
                    }
                    Data.daily.count = rewardDay;
                    Data.daily.time = (0, ms_1.default)("59m") - Number(moment_1.default.utc().endOf('day'));
                    Data.save();
                    rewardMessage = '';
                    whatDay = '';
                    switch (rewardDay) {
                        case 1:
                            rewardMessage = 'You have received a free item!';
                            whatDay = 'first';
                            break;
                        case 2:
                            rewardMessage = 'You have received 50 virtual currency!';
                            whatDay = 'second';
                            break;
                        case 3:
                            rewardMessage = 'You have received a free premium feature!';
                            whatDay = 'third';
                            break;
                        case 4:
                            rewardMessage =
                                'You have received a discount on your next purchase!';
                            whatDay = 'fourth';
                            break;
                        case 5:
                            rewardMessage = 'You have received a free in-game currency!';
                            whatDay = 'fifth';
                            break;
                        case 6:
                            rewardMessage = 'You have received a random item from the store!';
                            whatDay = 'sixth';
                            break;
                        case 7:
                            rewardMessage = 'You have received a special event ticket!';
                            whatDay = 'seventh';
                            break;
                        default:
                            rewardMessage = 'An error occurred. Please try again later.';
                            whatDay = 'unknown';
                            break;
                    }
                    return [2, { message: rewardMessage, day: whatDay }];
            }
        });
    });
}
exports.getDailyReward = getDailyReward;
