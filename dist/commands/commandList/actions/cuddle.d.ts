import { Client, CommandInteraction } from 'eris';
declare const _default: {
    data: {
        name: string;
        description: string;
        usage: string;
        options: {
            name: string;
            type: 6;
            description: string;
            required: boolean;
        }[];
    };
    execute(client: Client, interaction: CommandInteraction): Promise<void>;
};
export default _default;
