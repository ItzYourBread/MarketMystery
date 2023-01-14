"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var profile_1 = require("../../../database/profile");
var config = tslib_1.__importStar(require("../../../config.json"));
exports.default = {
    data: {
        name: 'balance',
        description: 'Your balance!',
        options: [
            {
                name: 'user',
                type: eris_1.Constants.ApplicationCommandOptionTypes.USER,
                description: 'Select a user',
                required: false,
            },
        ],
    },
    execute: function (client, interaction) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ids, user, Data, networth, balance, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 6]);
                        return [4, interaction.defer()];
                    case 1:
                        _a.sent();
                        ids = interaction.data.options && interaction.data.options[0]
                            ? interaction.data.options[0].value
                            : interaction.member.id;
                        user = client.users.get(ids);
                        return [4, profile_1.Profile.findOne({ id: user.id })];
                    case 2:
                        Data = (_a.sent()) ||
                            new profile_1.Profile({ id: user.id });
                        networth = Data.cash + Data.bank.cash;
                        balance = {
                            title: "".concat(user.username, "'s Balance"),
                            color: Number(config.colour.primary),
                            fields: [],
                            timestamp: new Date
                        };
                        if (Data.cash > 1) {
                            balance.fields.push({
                                name: "Cash:",
                                value: "`".concat(Data.cash.toLocaleString(), "` "),
                                inline: false,
                            });
                        }
                        if (Data.bank.stats && Data.bank.cash > 1) {
                            balance.fields.push({
                                name: "Bank:",
                                value: "`".concat(Data.bank.cash.toLocaleString(), "` "),
                                inline: false
                            });
                        }
                        if (networth > 1) {
                            balance.fields.push({
                                name: "bank:",
                                value: "`".concat(networth.toLocaleString(), "` "),
                                inline: false
                            });
                        }
                        return [4, interaction.editOriginalMessage({ embeds: [balance] })];
                    case 3:
                        _a.sent();
                        return [3, 6];
                    case 4:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [4, interaction.editOriginalMessage({
                                content: 'Something went wrong :(',
                            })];
                    case 5:
                        _a.sent();
                        setTimeout(function () {
                            interaction.deleteOriginalMessage();
                        }, 5000);
                        return [2];
                    case 6: return [2];
                }
            });
        });
    },
};
