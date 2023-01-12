import { Client, CommandInteraction } from 'eris';
import { Stock } from '../../../../../database/stock';
import { Profile } from '../../../../../database/profile';
import * as config from '../../../../../config.json';

export async function StockTrade(
    client: Client,
    interaction: CommandInteraction
) {
    try {
        await interaction.defer();
        const sender = interaction.member;
        const receiver = (interaction.data.options[0] as any).options[0].value;
        const ticker = (interaction.data.options[0] as any).options[1].value;
        const amount = (interaction.data.options[0] as any).options[2].value;

        // check if receiver is a valid user
        if (!receiver) {
            let error = {
                color: Number(config.colour.danger),
                title: 'Invalid User',
                description:
                    'Please select a valid user to trade shares with.',
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
                    }
                ],
                footer: {
                    text: `Stock Market`,
                },
                timestamp: new Date(),
            };
            await interaction.editOriginalMessage({ embeds: [error] });
            setTimeout(() => {
                interaction.deleteOriginalMessage();
            }, 15000);
            return;
        }

        // check if sender has enough shares to trade
        const senderProfile =
            (await Profile.findOne({ id: sender.id })) ||
            new Profile({ id: sender.id });
        if (!senderProfile || senderProfile.stock[ticker].shares < amount) {
            let error = {
                color: Number(config.colour.danger),
                title: 'Not Enough Shares',
                description: `You do not have enough shares of ${ticker} to trade. Please check your portfolio and make sure that you have the correct number of shares before attempting to trade again.`,
                fields: [
                    {
                        name: 'Options',
                        value: 'You can either: \n\n- Purchase more shares of the stock before trading \n- Select a different stock to trade',
                        inline: false,
                    },
                ],
                footer: {
                    text: `Stock Market`,
                },
                timestamp: new Date(),
            };
            await interaction.editOriginalMessage({ embeds: [error] });
            setTimeout(() => {
                interaction.deleteOriginalMessage();
            }, 15000);
            return;
        }

        // update sender and receiver shares
        senderProfile.stock[ticker].shares -= amount;
        await senderProfile.save();

        const receiverProfile =
            (await Profile.findOne({ id: receiver.id })) ||
            new Profile({ id: receiver.id });
        receiverProfile.stock[ticker].shares += amount;
        await receiverProfile.save();

		let newSenderShares = senderProfile.stock[ticker].shares - amount;
		let newReceiverShares = receiverProfile.stock[ticker].shares + amount;
        // send success message
        let success = {
            color: Number(config.colour.primary),
            title: 'Trade Successful',
            description: `You have successfully traded ${amount} shares of ${ticker} with ${receiver.username}.`,
            fields: [
                {
                    name: 'Shares Traded',
                    value: `${amount} shares of ${ticker}`,
                    inline: true,
                },
                {
                    name: 'Traded With',
                    value: `${receiver.username}`,
                    inline: true,
                },
                {
                    name: 'New Share Balance',
                    value: `Your new share balance for ${ticker} is ${newSenderShares} shares.`,
                    inline: false,
                },
                {
                    name: 'Receiver\'s New Share Balance',
                    value: `${receiver.username}'s new share balance for ${ticker} is ${newReceiverShares} shares.`,
                    inline: false,
                }
            ],
            footer: {
                text: `Stock Market`,
            },
            timestamp: new Date(),
        };

        await interaction.editOriginalMessage({ embeds: [success] });
    } catch (err) {
        console.error(err);
        await interaction.editOriginalMessage({
            content: 'Something went wrong :(',
        });
        setTimeout(() => {
            interaction.deleteOriginalMessage();
        }, 5000);
        return;
    }
}
