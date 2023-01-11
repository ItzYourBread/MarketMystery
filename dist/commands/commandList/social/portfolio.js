"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var profile_1 = require("../../../database/profile");
var stock_1 = require("../../../database/stock");
var config = tslib_1.__importStar(require("../../../config.json"));
var ticker = 'SKYT';
exports.default = {
    data: {
        name: 'portfolio',
        description: "View your & other's portfolio",
        options: [
            {
                name: 'user',
                type: eris_1.Constants.ApplicationCommandOptionTypes.USER,
                description: 'Select a user',
                required: false,
            },
        ],
    },
    execute: function (client, interaction) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ids, user, Data, portfolio, _a, _b, _i, ticker_1, stock, totalValue, embed, err_1;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 8, , 10]);
                        return [4, interaction.defer()];
                    case 1:
                        _c.sent();
                        ids = interaction.data.options && interaction.data.options[0]
                            ? interaction.data.options[0].value
                            : interaction.member.id;
                        user = client.users.get(ids);
                        return [4, profile_1.Profile.findOne({ id: user.id })];
                    case 2:
                        Data = (_c.sent()) ||
                            new profile_1.Profile({ id: user.id });
                        portfolio = [];
                        _a = [];
                        for (_b in Data.stock)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3, 6];
                        ticker_1 = _a[_i];
                        return [4, stock_1.Stock.findOne({ ticker: ticker_1 })];
                    case 4:
                        stock = _c.sent();
                        if (stock) {
                            portfolio.push({
                                ticker: ticker_1,
                                company: stock.company,
                                shares: Data.stock[ticker_1].shares,
                                value: stock.price * Data.stock[ticker_1].shares,
                            });
                        }
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3, 3];
                    case 6:
                        totalValue = portfolio.reduce(function (acc, cur) { return acc + cur.value; }, 0);
                        embed = {
                            title: "".concat(user.username, "'s Portfolio"),
                            color: Number(config.colour.primary),
                            fields: portfolio.map(function (stock) { return ({
                                name: "".concat(stock.company, " (").concat(stock.ticker, ")"),
                                value: "Shares: ".concat(stock.shares, "\nValue: $").concat(stock.value.toLocaleString()),
                                inline: true,
                            }); }),
                            footer: {
                                text: "Total Portfolio Value: $".concat(totalValue.toLocaleString()),
                            },
                            timestamp: new Date(),
                        };
                        return [4, interaction.editOriginalMessage({ embeds: [embed] })];
                    case 7:
                        _c.sent();
                        return [3, 10];
                    case 8:
                        err_1 = _c.sent();
                        console.error(err_1);
                        return [4, interaction.editOriginalMessage({
                                content: 'Something went wrong :(',
                            })];
                    case 9:
                        _c.sent();
                        setTimeout(function () {
                            interaction.deleteOriginalMessage();
                        }, 5000);
                        return [2];
                    case 10: return [2];
                }
            });
        });
    },
};
