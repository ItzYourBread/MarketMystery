"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var stubby_ts_1 = require("stubby.ts");
var config = tslib_1.__importStar(require("../../../config.json"));
var gifs = [
    'https://media.giphy.com/media/u9BxQbM5bxvwY/giphy.gif',
    'https://media.giphy.com/media/PHZ7v9tfQu0o0/giphy.gif',
    'https://media.giphy.com/media/3bqtLDeiDtwhq/giphy.gif',
    'https://media.giphy.com/media/LIqFOpO9Qh0uA/giphy.gif',
    'https://media.giphy.com/media/QFPoctlgZ5s0E/giphy.gif',
    'https://media.giphy.com/media/lrr9rHuoJOE0w/giphy.gif',
    'https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif',
    'https://media.giphy.com/media/ZQN9jsRWp1M76/giphy.gif',
    'https://media.giphy.com/media/du8yT5dStTeMg/giphy.gif',
    'https://acegif.com/wp-content/gif/anime-hug-59.gif',
    'https://acegif.com/wp-content/gif/anime-hug-38.gif',
    'https://acegif.com/wp-content/gif/anime-hug-86.gif',
    'https://acegif.com/wp-content/gif/anime-hug-14.gif',
    'https://acegif.com/wp-content/gif/anime-hug-3.gif',
    'https://acegif.com/wp-content/gif/anime-hug-84.gif',
    'https://acegif.com/wp-content/gif/anime-hug-36.gif',
    'https://acegif.com/wp-content/gif/anime-hug-45.gif',
    'https://media1.tenor.com/images/94989f6312726739893d41231942bb1b/tenor.gif?itemid=14106856',
    'https://media1.tenor.com/images/4db088cfc73a5ee19968fda53be6b446/tenor.gif?itemid=14637016',
    'https://media1.tenor.com/images/7db5f172665f5a64c1a5ebe0fd4cfec8/tenor.gif?itemid=9200935',
    'https://media1.tenor.com/images/78d3f21a608a4ff0c8a09ec12ffe763d/tenor.gif?itemid=16509980',
    'https://media1.tenor.com/images/bb9c0c56769afa3b58b9efe5c7bcaafb/tenor.gif?itemid=16831471',
    'https://media1.tenor.com/images/1b532e3c2000ac2c4fb3ce033f3a7ccd/tenor.gif?itemid=18996997',
];
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
            var user, username, random, hug, err_1;
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
                                content: "You can't hug yourself!! -.-",
                            })];
                    case 2:
                        _a.sent();
                        setTimeout(function () {
                            interaction.deleteOriginalMessage();
                        }, 5000);
                        return [2];
                    case 3:
                        hug = {
                            title: "".concat(interaction.member.username, " & ").concat(username),
                            color: Number(config.colour.primary),
                            image: {
                                url: random,
                            },
                            footer: {
                                text: 'Awww...',
                            },
                            timestamp: new Date(),
                        };
                        return [4, interaction.editOriginalMessage({ embeds: [hug] })];
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
