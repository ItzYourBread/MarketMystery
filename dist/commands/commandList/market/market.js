"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var view_1 = require("./subs/market/view");
exports.default = {
    data: {
        name: "market",
        description: "SubCommands of Market",
        options: [
            {
                name: "view",
                type: eris_1.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                description: "View all the stock companies"
            },
        ]
    },
    execute: function (client, interaction) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (interaction.data.options[0].name) {
                    case "view":
                        (0, view_1.getView)(client, interaction);
                        break;
                }
                return [2];
            });
        });
    }
};
