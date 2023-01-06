"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockSell = void 0;
var tslib_1 = require("tslib");
var stock_1 = require("../../../../../database/stock");
var profile_1 = require("../../../../../database/profile");
var config = tslib_1.__importStar(require("../../../../../config.json"));
function StockSell(client, interaction) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var user, ticker, amount, stock, Data, insufficientShares, sellPrice, success, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 9]);
                    return [4, interaction.defer()];
                case 1:
                    _a.sent();
                    user = interaction.member;
                    ticker = interaction.data.options[0].options[0].value;
                    amount = interaction.data.options[0].options[1].value;
                    return [4, stock_1.Stock.findOne({ ticker: ticker })];
                case 2:
                    stock = _a.sent();
                    return [4, profile_1.Profile.findOne({ id: user.id })];
                case 3:
                    Data = (_a.sent()) ||
                        new profile_1.Profile({ id: user.id });
                    if (!(Data.stock[ticker].shares < amount)) return [3, 5];
                    insufficientShares = {
                        color: Number(config.colour.danger),
                        description: "You don't have enough shares of **".concat(ticker, "** to sell. Please try again with a lower amount."),
                        footer: {
                            text: 'Stock Sell Error',
                        },
                        timestamp: new Date(),
                    };
                    return [4, interaction.editOriginalMessage({
                            embeds: [insufficientShares],
                        })];
                case 4:
                    _a.sent();
                    setTimeout(function () {
                        interaction.deleteOriginalMessage();
                    }, 15000);
                    return [2];
                case 5:
                    sellPrice = stock.price * amount;
                    Data.cash += sellPrice;
                    Data.stock[ticker].shares -= amount;
                    Data.save();
                    stock.shares += amount;
                    stock.price -= sellPrice;
                    stock.save();
                    success = {
                        color: Number(config.colour.primary),
                        title: 'Stock Sell Successful',
                        description: "You have successfully sold ".concat(amount, " shares of **").concat(ticker, "** for a total of $").concat(sellPrice, "."),
                        footer: {
                            text: 'Stock Sell Success',
                        },
                        timestamp: new Date(),
                    };
                    return [4, interaction.editOriginalMessage({ embeds: [success] })];
                case 6:
                    _a.sent();
                    return [3, 9];
                case 7:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [4, interaction.editOriginalMessage({
                            content: 'Something went wrong :(',
                        })];
                case 8:
                    _a.sent();
                    setTimeout(function () {
                        interaction.deleteOriginalMessage();
                    }, 5000);
                    return [2];
                case 9: return [2];
            }
        });
    });
}
exports.StockSell = StockSell;
