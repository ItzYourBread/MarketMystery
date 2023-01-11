"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var stock_1 = require("./database/stock");
require("dotenv/config");
var secretKey = 'kOBJ17rPD4ijusnr9ow6DQ9BdR1z0YVl';
var app = (0, express_1.default)();
var checkKey = function (req, res, next) {
    var key = req.query.key;
    if (key !== secretKey) {
        return res
            .status(401)
            .send('Invalid key You can find the key from documents!');
    }
    next();
};
app.use(checkKey);
app.get('/stock/:ticker', function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
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
    console.log('Server listening on port 3000');
});
