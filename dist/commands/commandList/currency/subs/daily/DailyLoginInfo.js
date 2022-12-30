"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyLoginInfo = void 0;
var tslib_1 = require("tslib");
var profile_1 = require("../../../../../database/profile");
function DailyLoginInfo(client, interaction) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var user, Data, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 5]);
                    return [4, interaction.defer()];
                case 1:
                    _a.sent();
                    user = interaction.member;
                    return [4, profile_1.Profile.findOne({ id: user.id })];
                case 2:
                    Data = (_a.sent()) ||
                        new profile_1.Profile({ id: user.id });
                    return [3, 5];
                case 3:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [4, interaction.editOriginalMessage({
                            content: 'Something went wrong :(',
                        })];
                case 4:
                    _a.sent();
                    setTimeout(function () {
                        interaction.deleteOriginalMessage();
                    }, 5000);
                    return [2];
                case 5: return [2];
            }
        });
    });
}
exports.DailyLoginInfo = DailyLoginInfo;
