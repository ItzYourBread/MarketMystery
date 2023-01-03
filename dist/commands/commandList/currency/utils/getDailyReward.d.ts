import { CommandInteraction } from 'eris';
export declare function getDailyReward(interaction: CommandInteraction): Promise<{
    message: string;
    day: string;
}>;
