"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var stock_1 = require("./database/stock");
require("dotenv/config");
var app = (0, express_1.default)();
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
app.get('/api/login', function (req, res) {
    var redirectUri = 'https://vue.subsidised.repl.co/';
    var clientId = '943855772415193118';
    var scope = 'identify';
    var responseType = 'code';
    var url = "https://discord.com/oauth2/authorize?client_id=".concat(clientId, "&scope=").concat(scope, "&response_type=").concat(responseType, "&redirect_uri=").concat(redirectUri);
    res.redirect(url);
});
app.listen(process.env.PORT, function () {
    console.log(chalk_1.default.greenBright("Server is running on port ".concat(process.env.PORT)));
});
