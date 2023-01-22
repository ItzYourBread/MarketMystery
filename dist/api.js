"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var stock_1 = require("./database/stock");
require("dotenv/config");
var express_session_1 = tslib_1.__importDefault(require("express-session"));
var node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
var app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: 'wishd827sjusbdlcjsbsisbs829jsjsbduwbz',
    resave: false,
    saveUninitialized: true,
}));
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
app.get('/login', function (req, res) {
    var redirectUri = 'http://103.60.13.253:20306/callback/';
    var clientId = '943855772415193118';
    var scope = 'identify+email';
    var responseType = 'code';
    var url = "https://discordapp.com/oauth2/authorize?client_id=".concat(clientId, "&scope=").concat(scope, "&response_type=").concat(responseType, "&redirect_uri=").concat(redirectUri);
    res.redirect(url);
});
app.get('/callback', function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var code, redirectUri, clientId, clientSecret, url, response, json, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = req.query.code;
                redirectUri = 'http://103.60.13.253:20306/callback/';
                clientId = '943855772415193118';
                clientSecret = 'GJ7NGk8AoTBZZda_dfZUH9N0Ep6ZtUjs';
                url = "https://discord.com/api/oauth2/token?grant_type=authorization_code&code=".concat(code, "&redirect_uri=").concat(redirectUri, "&client_id=").concat(clientId, "&client_secret=").concat(clientSecret);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4, (0, node_fetch_1.default)(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })];
            case 2:
                response = _a.sent();
                if (!response.ok) {
                    console.log("Error: ".concat(response.statusText));
                }
                return [4, response.json()];
            case 3:
                json = _a.sent();
                if (!json.access_token) {
                    console.log('Error: Missing access_token');
                }
                req.session['access_token'] = json.access_token;
                req.session.save();
                res.redirect("https://vue.subsidised.repl.co/");
                return [3, 5];
            case 4:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).send(err_1.message);
                return [3, 5];
            case 5: return [2];
        }
    });
}); });
app.listen(process.env.PORT, function () {
    console.log(chalk_1.default.greenBright("Server is running on port ".concat(process.env.PORT)));
});
