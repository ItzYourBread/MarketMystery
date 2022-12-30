"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stock = void 0;
var tslib_1 = require("tslib");
var mongoose_1 = tslib_1.__importStar(require("mongoose"));
var stock = new mongoose_1.Schema({
    ticker: { type: String },
    company: { type: String },
    industry: { type: String },
    price: { type: Number },
    dividends: { type: Number },
    volatility: { type: Number },
    shares: { type: Number },
});
var Stock = mongoose_1.default.model('stock', stock);
exports.Stock = Stock;
