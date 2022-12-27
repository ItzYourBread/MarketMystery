"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDailyReward = void 0;
var tslib_1 = require("tslib");
var profile_1 = require("../../../../database/profile");
function getDailyReward(interaction) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var user, Data, rewardDay;
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
                    Data.save();
                    switch (rewardDay) {
                        case 1:
                            return [2, 'You have received a free item!'];
                        case 2:
                            return [2, 'You have received 50 virtual currency!'];
                        case 3:
                            return [2, 'You have received a free premium feature!'];
                        case 4:
                            return [2, 'You have received a discount on your next purchase!'];
                        case 5:
                            return [2, 'You have received a free in-game currency!'];
                        case 6:
                            return [2, 'You have received a random item from the store!'];
                        case 7:
                            return [2, 'You have received a special event ticket!'];
                        default:
                            return [2, 'An error occurred. Please try again later.'];
                    }
                    return [2];
            }
        });
    });
}
exports.getDailyReward = getDailyReward;
