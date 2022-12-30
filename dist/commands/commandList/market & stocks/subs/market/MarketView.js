"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketView = void 0;
var tslib_1 = require("tslib");
var profile_1 = require("../../../../../database/profile");
function MarketView(client, interaction) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var user, Data, err_1;
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
                    return [4, interaction.editOriginalMessage({
                            content: 'Successfully works ',
                        })];
                case 3:
                    _a.sent();
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
exports.MarketView = MarketView;
