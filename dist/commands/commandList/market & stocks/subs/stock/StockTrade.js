"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockTrade = void 0;
var tslib_1 = require("tslib");
var profile_1 = require("../../../../../database/profile");
var config = tslib_1.__importStar(require("../../../../../config.json"));
function StockTrade(client, interaction) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var sender, user, ticker, amount, receiver, error, senderProfile, error, receiverProfile, newSenderShares, newReceiverShares, success, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 12]);
                    return [4, interaction.defer()];
                case 1:
                    _a.sent();
                    sender = interaction.member;
                    user = interaction.data.options[0].options[0].value;
                    ticker = interaction.data.options[0].options[1].value;
                    amount = interaction.data.options[0].options[2].value;
                    return [4, client.users.get(user)];
                case 2:
                    receiver = _a.sent();
                    if (!!receiver) return [3, 4];
                    error = {
                        color: Number(config.colour.danger),
                        title: 'Invalid User',
                        description: 'Please select a valid user to trade shares with.',
                        fields: [
                            {
                                name: 'Reason',
                                value: 'The user you have selected is not a member of this server, or is not a valid Discord user.',
                                inline: false,
                            },
                            {
                                name: 'Solution',
                                value: 'Please select a user that is currently a member of this server.',
                                inline: false,
                            },
                        ],
                        footer: {
                            text: "Stock Market",
                        },
                        timestamp: new Date(),
                    };
                    return [4, interaction.editOriginalMessage({ embeds: [error] })];
                case 3:
                    _a.sent();
                    setTimeout(function () {
                        interaction.deleteOriginalMessage();
                    }, 15000);
                    return [2];
                case 4: return [4, profile_1.Profile.findOne({ id: sender.id })];
                case 5:
                    senderProfile = (_a.sent()) ||
                        new profile_1.Profile({ id: sender.id });
                    if (!(senderProfile.stock[ticker].shares < amount)) return [3, 7];
                    error = {
                        color: Number(config.colour.danger),
                        title: 'Not Enough Shares',
                        description: "You do not have enough shares of ".concat(ticker, " to trade. Please check your portfolio and make sure that you have the correct number of shares before attempting to trade again."),
                        fields: [
                            {
                                name: 'Options',
                                value: 'You can either: \n\n- Purchase more shares of the stock before trading \n- Select a different stock to trade',
                                inline: false,
                            },
                        ],
                        footer: {
                            text: "Stock Market",
                        },
                        timestamp: new Date(),
                    };
                    return [4, interaction.editOriginalMessage({ embeds: [error] })];
                case 6:
                    _a.sent();
                    setTimeout(function () {
                        interaction.deleteOriginalMessage();
                    }, 15000);
                    return [2];
                case 7: return [4, profile_1.Profile.findOne({ id: receiver.id })];
                case 8:
                    receiverProfile = (_a.sent()) ||
                        new profile_1.Profile({ id: receiver.id });
                    newSenderShares = senderProfile.stock[ticker].shares - amount;
                    newReceiverShares = receiverProfile.stock[ticker].shares + amount;
                    senderProfile.stock[ticker].shares -= amount;
                    senderProfile.save();
                    receiverProfile.stock[ticker].shares += amount;
                    receiverProfile.save();
                    success = {
                        color: Number(config.colour.primary),
                        title: 'Trade Successful',
                        description: "You have successfully traded ".concat(amount, " shares of ").concat(ticker, " with ").concat(receiver.username, "."),
                        fields: [
                            {
                                name: 'Shares Traded',
                                value: "".concat(amount, " shares of ").concat(ticker),
                                inline: true,
                            },
                            {
                                name: 'Traded With',
                                value: "".concat(receiver.username),
                                inline: true,
                            },
                            {
                                name: 'New Share Balance',
                                value: "Your new share balance for ".concat(ticker, " is ").concat(newSenderShares, " shares."),
                                inline: false,
                            },
                            {
                                name: "Receiver's New Share Balance",
                                value: "".concat(receiver.username, "'s new share balance for ").concat(ticker, " is ").concat(newReceiverShares, " shares."),
                                inline: false,
                            },
                        ],
                        footer: {
                            text: "Stock Market",
                        },
                        timestamp: new Date(),
                    };
                    return [4, interaction.editOriginalMessage({ embeds: [success] })];
                case 9:
                    _a.sent();
                    return [3, 12];
                case 10:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [4, interaction.editOriginalMessage({
                            content: 'Something went wrong :(',
                        })];
                case 11:
                    _a.sent();
                    setTimeout(function () {
                        interaction.deleteOriginalMessage();
                    }, 5000);
                    return [2];
                case 12: return [2];
            }
        });
    });
}
exports.StockTrade = StockTrade;
