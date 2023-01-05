"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketView = void 0;
var tslib_1 = require("tslib");
var stock_1 = require("../../../../../database/stock");
var config = tslib_1.__importStar(require("../../../../../config.json"));
function MarketView(client, interaction) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var stocks, list, _i, stocks_1, stock, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 6]);
                    return [4, interaction.defer()];
                case 1:
                    _a.sent();
                    return [4, stock_1.Stock.find()];
                case 2:
                    stocks = _a.sent();
                    list = {
                        title: 'Stock Market View',
                        color: Number(config.colour.primary),
                        description: 'Here is a list of all the stocks in the market:',
                        fields: [],
                        footer: {
                            text: 'Stocks',
                        },
                        timestamp: new Date(),
                    };
                    for (_i = 0, stocks_1 = stocks; _i < stocks_1.length; _i++) {
                        stock = stocks_1[_i];
                        list.fields.push({
                            name: "".concat(stock.ticker, " (").concat(stock.company, ")"),
                            value: "Price: $".concat(stock.price.toLocaleString(), "\nShares: ").concat(stock.shares.toLocaleString()),
                            inline: true,
                        });
                    }
                    return [4, interaction.editOriginalMessage({ embeds: [list] })];
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
