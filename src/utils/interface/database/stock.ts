import { Document } from 'mongoose';

interface IStock extends Document {
    ticker: string;
    company: string;
    industry: string;
    price: number;
    shares: number;
    history: number [];
}

export { IStock };

