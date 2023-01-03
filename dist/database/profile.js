"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
var tslib_1 = require("tslib");
var mongoose_1 = tslib_1.__importStar(require("mongoose"));
var profile = new mongoose_1.Schema({
    id: { type: String, unique: true, required: true },
    cash: { type: Number, default: 200 },
    bank: {
        stats: { type: Boolean, default: false },
        cash: { type: Number, default: 1 },
    },
    daily: {
        count: { type: Number, default: 0 },
        time: { type: Date, default: new Date() },
    },
});
var Profile = mongoose_1.default.model('profile', profile);
exports.Profile = Profile;
