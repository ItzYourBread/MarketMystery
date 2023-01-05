"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var StockView_1 = require("./subs/stock/StockView");
var stocks_json_1 = require("../../../json/stocks.json");
exports.default = {
    data: {
        name: 'stock',
        description: 'SubCommands of Stock',
        options: [
            {
                name: 'view',
                type: eris_1.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                description: 'View a specific stock',
                options: [
                    {
                        name: 'ticker',
                        type: eris_1.Constants.ApplicationCommandOptionTypes.STRING,
                        description: 'Choose a ticker please',
                        required: true,
                        choices: stocks_json_1.StockList,
                    },
                ],
            },
        ],
    },
    execute: function (client, interaction) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (interaction.data.options[0].name) {
                    case 'view':
                        (0, StockView_1.StockView)(client, interaction);
                        break;
                    default:
                        break;
                }
                return [2];
            });
        });
    },
};
