"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var path_1 = tslib_1.__importDefault(require("path"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var stock_1 = require("../database/stock");
require("dotenv/config");
var app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '../../site'));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../site')));
app.get('/', function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        res.render('index');
        return [2];
    });
}); });
app.get('/tos', function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        res.render('tos');
        return [2];
    });
}); });
app.get('/api/stock/:ticker', function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var ticker, stock;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ticker = req.params.ticker;
                return [4, stock_1.Stock.findOne({ ticker: ticker })];
            case 1:
                stock = _a.sent();
                if (!stock) {
                    res.status(404).send('Error: Stock not found');
                    return [2];
                }
                res.send(stock.history);
                return [2];
        }
    });
}); });
app.listen(process.env.PORT, function () {
    console.log(chalk_1.default.greenBright("Server is running on port ".concat(process.env.PORT)));
});
