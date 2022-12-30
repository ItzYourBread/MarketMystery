import mongoose, { Schema } from 'mongoose';
import { IStock } from '../utils/interface/database/stock';

const stock: Schema = new Schema({
    ticker: { type: String },
    company: { type: String },
    industry: { type: String },
    price: { type: Number },
    dividends: { type: Number },
    volatility: { type: Number },
    shares: { type: Number },
});

const Stock = mongoose.model<IStock>('stock', stock);
export { Stock };
