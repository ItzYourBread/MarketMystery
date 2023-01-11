import mongoose, { Schema } from 'mongoose';
import { IProfile } from '../utils/interface/database/profile';

const profile: Schema = new Schema({
    id: { type: String, unique: true, required: true },
    cash: { type: Number, default: 800 },
    bank: {
        stats: { type: Boolean, default: false },
        cash: { type: Number, default: 0 },
    },
    daily: {
        count: { type: Number, default: 0 },
        time: { type: Date },
    },
    stock: {
        SKYT: {
            shares: { type: Number, default: 0 },
        },
        GKYN: {
            shares: { type: Number, default: 0 },
        },
    },
});

const Profile = mongoose.model<IProfile>('profile', profile);
export { Profile };
