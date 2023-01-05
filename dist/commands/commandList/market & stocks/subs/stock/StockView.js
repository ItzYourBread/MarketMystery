"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockView = void 0;
var tslib_1 = require("tslib");
var stock_1 = require("../../../../../database/stock");
var config = tslib_1.__importStar(require("../../../../../config.json"));
function StockView(client, interaction) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var user, ticker, stock, data, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 6]);
                    return [4, interaction.defer()];
                case 1:
                    _a.sent();
                    user = interaction.member;
                    ticker = interaction.data.options[0].options[0].value;
                    return [4, stock_1.Stock.findOne({ ticker: ticker })];
                case 2:
                    stock = _a.sent();
                    data = {
                        color: Number(config.colour.primary),
                        title: "".concat(stock.company, " (").concat(stock.ticker, ")"),
                        description: "**Industry:** ".concat(stock.industry),
                        fields: [
                            {
                                name: 'Price',
                                value: "$".concat(stock.price.toLocaleString()),
                                inline: true,
                            },
                            {
                                name: 'Shares',
                                value: stock.shares.toLocaleString(),
                                inline: true,
                            },
                        ],
                        footer: {
                            text: "Stock Information",
                        },
                        timestamp: new Date(),
                    };
                    return [4, interaction.editOriginalMessage({ embeds: [data] })];
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
exports.StockView = StockView;
