import mongoose, { Schema } from 'mongoose';
import { IStock } from '../utils/interface/database/stock';

const stock: Schema = new Schema({
    ticker: { type: String, required: true, unique: true, },
    company: { type: String, required: true, unique: true, },
    industry: { type: String },
    price: { type: Number },
    shares: { type: Number },
});

const Stock = mongoose.model<IStock>('stock', stock);
export { Stock };
