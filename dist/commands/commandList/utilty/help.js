"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var config = tslib_1.__importStar(require("../../../config.json"));
exports.default = {
    data: {
        name: 'help',
        description: 'Get help!',
    },
    execute: function (client, interaction) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var commands;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        commands = {
                            title: 'Commanda',
                            color: Number(config.colour.primary),
                        };
                        return [4, interaction.createMessage({ embeds: [commands] })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    },
};
