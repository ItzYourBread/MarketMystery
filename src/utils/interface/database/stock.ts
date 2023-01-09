import { Document } from 'mongoose';

interface IStock extends Document {
    ticker: string;
    company: string;
    industry: string;
    price: number;
    shares: number;
    history: {
        time: number;
        price: number;
        status: string;
    }[];
}

export { IStock };
