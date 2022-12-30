import { Client, CommandInteraction } from 'eris';
declare const _default: {
    data: {
        name: string;
        description: string;
        options: {
            name: string;
            type: 1;
            description: string;
            options: {
                name: string;
                type: 3;
                description: string;
                required: boolean;
                choices: {
                    name: string;
                    value: string;
                }[];
            }[];
        }[];
    };
    execute(client: Client, interaction: CommandInteraction): Promise<void>;
};
export default _default;
