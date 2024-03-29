"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockUpdate = void 0;
var tslib_1 = require("tslib");
var stock_1 = require("../database/stock");
var stubby_ts_1 = require("stubby.ts");
var ms_1 = tslib_1.__importDefault(require("ms"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
function StockUpdate(ticker) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            setInterval(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var stock, newPrice, volatility, change;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, stock_1.Stock.findOne({ ticker: ticker })];
                        case 1:
                            stock = _a.sent();
                            if (!stock) {
                                console.log("No stock found with ticker ".concat(ticker));
                                return [2];
                            }
                            volatility = (0, stubby_ts_1.RandomNumber)(1, 5);
                            change = stock.price * (volatility / 100) * (Math.random() > 0.5 ? 1 : -1);
                            newPrice = stock.price + change;
                            stock.history.push({
                                time: Number(new Date()),
                                price: newPrice,
                                status: newPrice > stock.price ? 'up' : 'down',
                            });
                            stock.price = newPrice;
                            return [4, stock.save()];
                        case 2:
                            _a.sent();
                            console.log(chalk_1.default.white("[New Price] $".concat(stock.price.toLocaleString(), " value for ").concat(stock.ticker, " (").concat(stock.company, ")!")));
                            return [2];
                    }
                });
            }); }, (0, ms_1.default)('15m'));
            console.log(chalk_1.default.magentaBright("[Stock Updater] ".concat(ticker, " Activated!")));
            return [2];
        });
    });
}
exports.StockUpdate = StockUpdate;
