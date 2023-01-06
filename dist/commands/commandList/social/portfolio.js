"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var profile_1 = require("../../../database/profile");
var stock_1 = require("../../../database/stock");
exports.default = {
    data: {
        name: 'portfolio',
        description: "View your & other's portfolio",
    },
    execute: function (client, interaction) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user, Data, embeds, _i, _a, ticker, stock, shares, value, embed, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 10, , 12]);
                        return [4, interaction.defer()];
                    case 1:
                        _b.sent();
                        user = interaction.member;
                        return [4, profile_1.Profile.findOne({ id: user.id })];
                    case 2:
                        Data = (_b.sent()) ||
                            new profile_1.Profile({ id: user.id });
                        if (!!Data.stock) return [3, 4];
                        return [4, interaction.editOriginalMessage({
                                content: "You don't have any stocks in your portfolio.",
                            })];
                    case 3:
                        _b.sent();
                        setTimeout(function () {
                            interaction.deleteOriginalMessage();
                        }, 5000);
                        return [2];
                    case 4:
                        embeds = [];
                        _i = 0, _a = Object.keys(Data.stock);
                        _b.label = 5;
                    case 5:
                        if (!(_i < _a.length)) return [3, 8];
                        ticker = _a[_i];
                        return [4, stock_1.Stock.findOne({ ticker: ticker })];
                    case 6:
                        stock = _b.sent();
                        shares = Data.stock[ticker].shares;
                        value = shares * stock.price;
                        embed = {
                            title: "".concat(stock.company, " (").concat(ticker, ")"),
                            description: "Shares: ".concat(shares.toLocaleString(), "\nTotal Value: $").concat(value.toFixed(2)),
                        };
                        embeds.push(embed);
                        _b.label = 7;
                    case 7:
                        _i++;
                        return [3, 5];
                    case 8: return [4, interaction.editOriginalMessage({ embeds: embeds })];
                    case 9:
                        _b.sent();
                        return [3, 12];
                    case 10:
                        err_1 = _b.sent();
                        console.error(err_1);
                        return [4, interaction.editOriginalMessage({
                                content: 'Something went wrong :(',
                            })];
                    case 11:
                        _b.sent();
                        setTimeout(function () {
                            interaction.deleteOriginalMessage();
                        }, 5000);
                        return [2];
                    case 12: return [2];
                }
            });
        });
    },
};
