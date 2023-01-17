"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockBuy = void 0;
var tslib_1 = require("tslib");
var stock_1 = require("../../../../../database/stock");
var profile_1 = require("../../../../../database/profile");
var config = tslib_1.__importStar(require("../../../../../config.json"));
function StockBuy(client, interaction) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var user, ticker, amount, stock, Data, notenough, cost, notenough, totalCost, totalShares, success, up, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 11]);
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
                    if (!(stock.shares < amount)) return [3, 5];
                    notenough = {
                        color: Number(config.colour.danger),
                        title: 'Not Enough Shares',
                        description: "There are not enough shares available to complete your purchase. There are only `".concat(stock.shares.toLocaleString(), "` shares available of ").concat(stock.company, " (").concat(stock.ticker, "), but you are trying to buy `").concat(amount, "` shares."),
                        fields: [
                            {
                                name: 'Options',
                                value: 'You can either: \n\n- Wait until more shares become available \n- Purchase a different stock',
                                inline: false,
                            },
                        ],
                        footer: {
                            text: "Stock Market",
                        },
                        timestamp: new Date(),
                    };
                    return [4, interaction.editOriginalMessage({ embeds: [notenough] })];
                case 4:
                    _a.sent();
                    setTimeout(function () {
                        interaction.deleteOriginalMessage();
                    }, 15000);
                    return [2];
                case 5:
                    cost = stock.price * amount;
                    if (!(Data.cash < cost)) return [3, 7];
                    notenough = {
                        color: Number(config.colour.danger),
                        title: 'Insufficient Funds',
                        description: "You do not have enough funds to make this purchase. You need `$".concat(cost.toLocaleString(), "` to buy `").concat(amount.toLocaleString(), "` shares of ").concat(stock.company, " (").concat(ticker, "), but you only have `$").concat(Data.cash.toLocaleString(), "`."),
                        fields: [
                            {
                                name: 'Options',
                                value: 'You can either: \n\n- Trade some items for high prices to a business man \n- Save up more money and try again later',
                                inline: false,
                            },
                        ],
                        footer: {
                            text: "Stock Market",
                        },
                        timestamp: new Date(),
                    };
                    return [4, interaction.editOriginalMessage({ embeds: [notenough] })];
                case 6:
                    _a.sent();
                    setTimeout(function () {
                        interaction.deleteOriginalMessage();
                    }, 15000);
                    return [2];
                case 7:
                    totalCost = amount * stock.price;
                    totalShares = Data.stock[ticker].shares + amount;
                    success = {
                        title: "Purchase Successful!",
                        color: Number(config.colour.primary),
                        description: "Congratulations on your successful purchase of ".concat(amount.toLocaleString(), " shares in ").concat(stock.company, " (").concat(ticker, "). Your portfolio has been updated to reflect your new ownership of these shares. Keep an eye on the market to see how your investment performs, and consider buying or selling at the right times to maximize your profits."),
                        fields: [
                            {
                                name: 'Total Cost',
                                value: "$`".concat(totalCost.toLocaleString(), "` "),
                                inline: true,
                            },
                            {
                                name: 'New Share Balance',
                                value: "`".concat(totalShares.toLocaleString(), "` shares"),
                                inline: true,
                            },
                        ],
                        footer: {
                            text: 'Stock Market',
                        },
                        timestamp: new Date(),
                    };
                    Data.cash -= cost;
                    Data.stock[ticker].shares += amount;
                    Data.save();
                    up = stock.price * 0.08 * amount;
                    stock.shares -= amount;
                    stock.price += up;
                    stock.save();
                    return [4, interaction.editOriginalMessage({ embeds: [success] })];
                case 8:
                    _a.sent();
                    return [3, 11];
                case 9:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [4, interaction.editOriginalMessage({
                            content: 'Something went wrong :(',
                        })];
                case 10:
                    _a.sent();
                    setTimeout(function () {
                        interaction.deleteOriginalMessage();
                    }, 5000);
                    return [2];
                case 11: return [2];
            }
        });
    });
}
exports.StockBuy = StockBuy;
