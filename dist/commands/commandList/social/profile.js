"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var config = tslib_1.__importStar(require("../../../config.json"));
exports.default = {
    data: {
        name: 'profile',
        description: 'Amazing profiles',
        usage: '/profile <user>',
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
            var ids, user, profile, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        return [4, interaction.defer()];
                    case 1:
                        _a.sent();
                        ids = interaction.data.options && interaction.data.options[0]
                            ? interaction.data.options[0].value
                            : interaction.member.id;
                        user = client.users.get(ids);
                        profile = {
                            title: "".concat(user.username, "'s Profile"),
                            color: Number(config.colour.primary),
                            description: 'Your beautiful Profile!',
                            timestamp: new Date(),
                        };
                        return [4, interaction.editOriginalMessage({ embeds: [profile] })];
                    case 2:
                        _a.sent();
                        return [3, 5];
                    case 3:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [4, interaction.editOriginalMessage({
                                content: 'Something went wrong :(',
                            })];
                    case 4:
                        _a.sent();
                        setTimeout(function () {
                            interaction.deleteOriginalMessage();
                        }, 5000);
                        return [2];
                    case 5: return [2];
                }
            });
        });
    },
};
