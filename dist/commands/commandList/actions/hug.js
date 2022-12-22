"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
exports.default = {
    data: {
        name: 'hug',
        description: 'Hug someone!',
        usage: '/hug {user}',
        options: [
            {
                name: 'user',
                type: eris_1.Constants.ApplicationCommandOptionTypes.USER,
                description: 'Select a user',
                required: true,
            },
        ],
    },
    execute: function (client, interaction) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user, hug, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, interaction.defer()];
                    case 1:
                        _a.sent();
                        user = interaction.data.options[0].value;
                        console.log(interaction.data.options[0]);
                        hug = {
                            title: "".concat(interaction.member.username, " & ").concat(user.username)
                        };
                        return [4, interaction.editOriginalMessage({ embeds: [hug] })];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [2, interaction.createMessage({
                                content: 'Something went wrong :(',
                                flags: 64,
                            })];
                    case 4: return [2];
                }
            });
        });
    },
};
