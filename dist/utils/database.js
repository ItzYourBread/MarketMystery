"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mongoose_1 = tslib_1.__importDefault(require("mongoose"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
require("dotenv/config");
function connect() {
    mongoose_1.default
        .connect(process.env.DATABASE)
        .then(function () {
        console.log(chalk_1.default.greenBright('[Database] Connected'));
    })
        .catch(function (err) {
        console.log(chalk_1.default.red('[Database] ⚠️ Unable to connect to MongoDB Database.\nError: ' +
            err));
    });
}
exports.default = { connect: connect };
