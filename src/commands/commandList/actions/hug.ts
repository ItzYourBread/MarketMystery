import { Constants, Client, CommandInteraction } from 'eris';
import { RandomArray } from 'stubby.ts';
import * as config from '../../../config.json';

let gifs = [
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

export default {
    data: {
        name: 'hug',
        description: 'Hug someone!',
        usage: '/hug {user}',
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
                    content: "You can't hug yourself!! -.-",
                });
                setTimeout(() => {
                    interaction.deleteOriginalMessage();
                }, 5000);
                return;
            }

            let hug = {
                title: `${interaction.member.username} & ${username}`,
                color: Number(config.colour.primary),
                image: {
                    url: random,
                },
                footer: {
                    text: 'Awww...',
                },
                timestamp: new Date(),
            };
            await interaction.editOriginalMessage({ embeds: [hug] });
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
