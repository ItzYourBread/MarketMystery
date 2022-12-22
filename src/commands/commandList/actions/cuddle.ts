import { Constants, Client, CommandInteraction } from 'eris';
import { RandomArray } from 'stubby.ts';
import * as config from '../../../config.json';

const gifs = [
    'https://media1.tenor.com/images/7edded2757934756fdc240019d956cb3/tenor.gif?itemid=16403937',
    'https://media1.tenor.com/images/a829b33d49f61a042728c06347bddd57/tenor.gif?itemid=5166505',
    'https://media1.tenor.com/images/9af57b60dca6860724a0ff6c1689c246/tenor.gif?itemid=8467962',
    'https://media1.tenor.com/images/6f7eebef17bf270fd7e1cb9117d190be/tenor.gif?itemid=16542536',
    'https://media1.tenor.com/images/5e007281145725639ae2e182a7f734d8/tenor.gif?itemid=11742921',
    'https://media1.tenor.com/images/d16a9affe8915e6413b0c1f1d380b2ee/tenor.gif?itemid=12669052',
    'https://media1.tenor.com/images/8f8ba3baeecdf28f3e0fa7d4ce1a8586/tenor.gif?itemid=12668750',
    'https://media1.tenor.com/images/94e6a5bca46ddbf4295a858add086224/tenor.gif?itemid=20714094',
];

export default {
    data: {
        name: 'cuddle',
        description: 'Cuddle someone!',
        usage: '/cuddle {user}',
        options: [
            {
                name: 'user',
                type: Constants.ApplicationCommandOptionTypes.USER,
                description: 'Select a user',
                required: true,
            },
        ],
    },
    async execute(client: Client, interaction: CommandInteraction) {
        try {
            await interaction.defer();
            const user = (interaction.data.options[0] as any).value;
            const username = client.users.get(user).username;
            const random = RandomArray(gifs);

            if (
                (interaction.data.options[0] as any).value ===
                interaction.member.id
            ) {
                await interaction.editOriginalMessage({
                    content: "You can't cuddle yourself!! -.-",
                });
                setTimeout(() => {
                    interaction.deleteOriginalMessage();
                }, 5000);
                return;
            }

            let cuddle = {
                title: `${interaction.member.username} & ${username}`,
                color: Number(config.colour.primary),
                image: {
                    url: random,
                },
                footer: {
                    text: 'Soo.. cute!!',
                },
                timestamp: new Date(),
            };
            await interaction.editOriginalMessage({ embeds: [cuddle] });
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
    },
};
