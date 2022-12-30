import { Document } from 'mongoose';
interface IStock extends Document {
    ticker: string;
    company: string;
    industry: string;
    price: number;
    dividends: number;
    volatility: number;
    shares: number;
}
export { IStock };
