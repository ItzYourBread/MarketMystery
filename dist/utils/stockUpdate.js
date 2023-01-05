"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockUpdate = void 0;
var tslib_1 = require("tslib");
var stock_1 = require("../database/stock");
var ms_1 = tslib_1.__importDefault(require("ms"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
function StockUpdate() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            setInterval(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var allStocks;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, stock_1.Stock.find({})];
                        case 1:
                            allStocks = _a.sent();
                            allStocks.forEach(function (stock) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var randomPercentage, newPrice, increaseAmount, decreaseAmount;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            randomPercentage = Math.random();
                                            if (randomPercentage < 0.4) {
                                                increaseAmount = Math.random() * 0.1 + 0.01;
                                                newPrice = stock.price * (1 + increaseAmount);
                                            }
                                            else if (randomPercentage > 0.6) {
                                                decreaseAmount = Math.random() * 0.1 + 0.01;
                                                newPrice = stock.price * (1 - decreaseAmount);
                                            }
                                            else {
                                                newPrice = stock.price;
                                            }
                                            stock.price = newPrice;
                                            return [4, stock.save()];
                                        case 1:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            }); });
                            return [2];
                    }
                });
            }); }, (0, ms_1.default)('25m'));
            console.log(chalk_1.default.magentaBright('[Stock Updater] Activated!'));
            return [2];
        });
    });
}
exports.StockUpdate = StockUpdate;
