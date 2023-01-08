import mongoose, { Schema } from 'mongoose';
import { IStock } from '../utils/interface/database/stock';

const stock: Schema = new Schema({
    ticker: { type: String, required: true, unique: true },
    company: { type: String, required: true, unique: true },
    industry: { type: String, required: true },
    price: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    history: [
        {
            time: { type: Date },
            price: { type: Number },
            status: { type: String },
        },
    ],
});

const Stock = mongoose.model<IStock>('stock', stock);
export { Stock };
