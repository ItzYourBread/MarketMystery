import mongoose from 'mongoose';
import { IStock } from '../utils/interface/database/stock';
declare const Stock: mongoose.Model<IStock, {}, {}, {}, any>;
export { Stock };
