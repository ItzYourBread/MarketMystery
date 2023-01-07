"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stock = void 0;
var tslib_1 = require("tslib");
var mongoose_1 = tslib_1.__importStar(require("mongoose"));
var stock = new mongoose_1.Schema({
    ticker: { type: String, required: true, unique: true },
    company: { type: String, required: true, unique: true },
    industry: { type: String, required: true },
    price: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    history: [{
            type: Number
        }]
});
var Stock = mongoose_1.default.model('stock', stock);
exports.Stock = Stock;
