"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var stubby_ts_1 = require("stubby.ts");
var config = tslib_1.__importStar(require("../../../config.json"));
var gifs = [
    'https://media1.tenor.com/images/7edded2757934756fdc240019d956cb3/tenor.gif?itemid=16403937',
    'https://media1.tenor.com/images/a829b33d49f61a042728c06347bddd57/tenor.gif?itemid=5166505',
    'https://media1.tenor.com/images/9af57b60dca6860724a0ff6c1689c246/tenor.gif?itemid=8467962',
    'https://media1.tenor.com/images/6f7eebef17bf270fd7e1cb9117d190be/tenor.gif?itemid=16542536',
    'https://media1.tenor.com/images/5e007281145725639ae2e182a7f734d8/tenor.gif?itemid=11742921',
    'https://media1.tenor.com/images/d16a9affe8915e6413b0c1f1d380b2ee/tenor.gif?itemid=12669052',
    'https://media1.tenor.com/images/8f8ba3baeecdf28f3e0fa7d4ce1a8586/tenor.gif?itemid=12668750',
    'https://media1.tenor.com/images/94e6a5bca46ddbf4295a858add086224/tenor.gif?itemid=20714094',
];
exports.default = {
    data: {
        name: 'cuddle',
        description: 'Cuddle someone!',
        usage: '/cuddle {user}',
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
            var user, username, random, cuddle, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 7]);
                        return [4, interaction.defer()];
                    case 1:
                        _a.sent();
                        user = interaction.data.options[0].value;
                        username = client.users.get(user).username;
                        random = (0, stubby_ts_1.RandomArray)(gifs);
                        if (!(interaction.data.options[0].value ===
                            interaction.member.id)) return [3, 3];
                        return [4, interaction.editOriginalMessage({
                                content: "You can't cuddle yourself!! -.-",
                            })];
                    case 2:
                        _a.sent();
                        setTimeout(function () {
                            interaction.deleteOriginalMessage();
                        }, 5000);
                        return [2];
                    case 3:
                        cuddle = {
                            title: "".concat(interaction.member.username, " & ").concat(username),
                            color: Number(config.colour.primary),
                            image: {
                                url: random,
                            },
                            footer: {
                                text: 'Soo.. cute!!',
                            },
                            timestamp: new Date(),
                        };
                        return [4, interaction.editOriginalMessage({ embeds: [cuddle] })];
                    case 4:
                        _a.sent();
                        return [3, 7];
                    case 5:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [4, interaction.editOriginalMessage({
                                content: 'Something went wrong :(',
                            })];
                    case 6:
                        _a.sent();
                        setTimeout(function () {
                            interaction.deleteOriginalMessage();
                        }, 5000);
                        return [2];
                    case 7: return [2];
                }
            });
        });
    },
};
