"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var StockView_1 = require("./subs/stock/StockView");
var StockBuy_1 = require("./subs/stock/StockBuy");
var StockSell_1 = require("./subs/stock/StockSell");
var StockTrade_1 = require("./subs/stock/StockTrade");
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
            {
                name: 'buy',
                type: eris_1.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                description: 'Buy stock shares',
                options: [
                    {
                        name: 'ticker',
                        type: eris_1.Constants.ApplicationCommandOptionTypes.STRING,
                        description: 'Choose a ticker please',
                        required: true,
                        choices: stocks_json_1.StockList,
                    },
                    {
                        name: 'shares',
                        type: eris_1.Constants.ApplicationCommandOptionTypes.NUMBER,
                        description: 'Amount of shares',
                        required: true,
                    },
                ],
            },
            {
                name: 'sell',
                type: eris_1.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                description: 'Sell stock shares',
                options: [
                    {
                        name: 'ticker',
                        type: eris_1.Constants.ApplicationCommandOptionTypes.STRING,
                        description: 'Choose a ticker please',
                        required: true,
                        choices: stocks_json_1.StockList,
                    },
                    {
                        name: 'shares',
                        type: eris_1.Constants.ApplicationCommandOptionTypes.NUMBER,
                        description: 'Amount of shares',
                        required: true,
                    },
                ],
            },
            {
                name: 'trade',
                type: eris_1.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                description: 'Trade stock shares',
                options: [
                    {
                        name: "user",
                        type: eris_1.Constants.ApplicationCommandOptionTypes.USER,
                        description: "Select a user",
                        required: true
                    },
                    {
                        name: 'ticker',
                        type: eris_1.Constants.ApplicationCommandOptionTypes.STRING,
                        description: 'Choose a ticker please',
                        required: true,
                        choices: stocks_json_1.StockList,
                    },
                    {
                        name: 'shares',
                        type: eris_1.Constants.ApplicationCommandOptionTypes.NUMBER,
                        description: 'Amount of shares',
                        required: true,
                    },
                ],
            }
        ],
    },
    execute: function (client, interaction) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (interaction.data.options[0].name) {
                    case 'view':
                        (0, StockView_1.StockView)(client, interaction);
                        break;
                    case 'buy':
                        (0, StockBuy_1.StockBuy)(client, interaction);
                        break;
                    case 'sell':
                        (0, StockSell_1.StockSell)(client, interaction);
                        break;
                    case "trade":
                        (0, StockTrade_1.StockTrade)(client, interaction);
                        break;
                    default:
                        break;
                }
                return [2];
            });
        });
    },
};
