"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockLeaderboard = void 0;
var tslib_1 = require("tslib");
var profile_1 = require("../../../../../database/profile");
var stock_1 = require("../../../../../database/stock");
var config = tslib_1.__importStar(require("../../../../../config.json"));
function StockLeaderboard(client, interaction) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var profiles, stocks, portfolioValues_1, _i, profiles_1, profile, value, _loop_1, _a, _b, ticker, sortedUsers, topUsers, list, i, user, value, embed, err_1;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, , 7]);
                    return [4, interaction.defer()];
                case 1:
                    _c.sent();
                    return [4, profile_1.Profile.find()];
                case 2:
                    profiles = _c.sent();
                    return [4, stock_1.Stock.find()];
                case 3:
                    stocks = _c.sent();
                    portfolioValues_1 = {};
                    for (_i = 0, profiles_1 = profiles; _i < profiles_1.length; _i++) {
                        profile = profiles_1[_i];
                        value = 0;
                        _loop_1 = function (ticker) {
                            var stock = stocks.find(function (s) { return s.ticker === ticker; });
                            if (stock) {
                                value += profile.stock[ticker].shares * stock.price;
                            }
                        };
                        for (_a = 0, _b = Object.keys(profile.stock); _a < _b.length; _a++) {
                            ticker = _b[_a];
                            _loop_1(ticker);
                        }
                        portfolioValues_1[profile.id] = value;
                    }
                    sortedUsers = Object.keys(portfolioValues_1).sort(function (a, b) {
                        return portfolioValues_1[b] - portfolioValues_1[a];
                    });
                    topUsers = sortedUsers.slice(0, 10);
                    list = "";
                    for (i = 0; i < topUsers.length; i++) {
                        user = client.users.get(topUsers[i]);
                        if (user) {
                            value = portfolioValues_1[topUsers[i]];
                            list += "**".concat(i + 1, "#** ").concat(user.username, " : $").concat(value.toLocaleString(), "\n\n");
                        }
                    }
                    embed = {
                        color: Number(config.colour.primary),
                        title: 'Stock Market Leaderboard (Global)',
                        description: "".concat(list),
                        footer: {
                            text: 'Stock Market',
                        },
                        timestamp: new Date(),
                    };
                    return [4, interaction.editOriginalMessage({ embeds: [embed] })];
                case 4:
                    _c.sent();
                    return [3, 7];
                case 5:
                    err_1 = _c.sent();
                    console.error(err_1);
                    return [4, interaction.editOriginalMessage({
                            content: 'Something went wrong :(',
                        })];
                case 6:
                    _c.sent();
                    setTimeout(function () {
                        interaction.deleteOriginalMessage();
                    }, 5000);
                    return [2];
                case 7: return [2];
            }
        });
    });
}
exports.StockLeaderboard = StockLeaderboard;
