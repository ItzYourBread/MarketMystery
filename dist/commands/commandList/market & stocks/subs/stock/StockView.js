"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockView = void 0;
var tslib_1 = require("tslib");
var stock_1 = require("../../../../../database/stock");
var config = tslib_1.__importStar(require("../../../../../config.json"));
var trend_1 = require("../../../../../utils/trend");
var node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
require("dotenv/config");
function trend() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var response, data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, (0, node_fetch_1.default)("http://103.60.13.252:20239/stock/SKYT" + process.env.API_KEY)];
                case 1:
                    response = _a.sent();
                    return [4, response.json()];
                case 2:
                    data = _a.sent();
                    return [4, (0, trend_1.Trend)(data)];
                case 3: return [2, _a.sent()];
            }
        });
    });
}
function StockView(client, interaction) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var user, ticker, stock, data, _a, err_1;
        var _b, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, , 7]);
                    return [4, interaction.defer()];
                case 1:
                    _d.sent();
                    user = interaction.member;
                    ticker = interaction.data.options[0].options[0].value;
                    return [4, stock_1.Stock.findOne({ ticker: ticker })];
                case 2:
                    stock = _d.sent();
                    _b = {
                        color: Number(config.colour.primary),
                        title: "".concat(stock.company, " (").concat(stock.ticker, ")"),
                        description: "**Industry:** ".concat(stock.industry)
                    };
                    _c = {
                        name: 'Trend'
                    };
                    _a = "".concat;
                    return [4, trend()];
                case 3:
                    data = (_b.fields = [
                        (_c.value = _a.apply("", [_d.sent()]),
                            _c.inline = false,
                            _c),
                        {
                            name: 'Price',
                            value: "$".concat(stock.price.toLocaleString()),
                            inline: true,
                        },
                        {
                            name: 'Shares',
                            value: stock.shares.toLocaleString(),
                            inline: true,
                        }
                    ],
                        _b.footer = {
                            text: "Stock Information",
                        },
                        _b.timestamp = new Date(),
                        _b);
                    return [4, interaction.editOriginalMessage({ embeds: [data] })];
                case 4:
                    _d.sent();
                    return [3, 7];
                case 5:
                    err_1 = _d.sent();
                    console.error(err_1);
                    return [4, interaction.editOriginalMessage({
                            content: 'Something went wrong :(',
                        })];
                case 6:
                    _d.sent();
                    setTimeout(function () {
                        interaction.deleteOriginalMessage();
                    }, 5000);
                    return [2];
                case 7: return [2];
            }
        });
    });
}
exports.StockView = StockView;
