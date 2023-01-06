import { Document } from 'mongoose';

interface IProfile extends Document {
    id: string;
    cash: number;
    bank: {
        stats: boolean;
        cash: number;
    };
    daily: {
        count: number;
        time: number;
    };
    stock: {
        SKYT: {
            shares: number;
        };
    };
}

export { IProfile };
