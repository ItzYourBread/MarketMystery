import mongoose, { Schema } from 'mongoose';
import { IProfile } from '../utils/interface/database/profile';

const profile: Schema = new Schema({
    id: { type: String, unique: true, required: true },
    cash: { type: Number, default: 200 },
    bank: {
        stats: { type: Boolean, default: false },
        cash: { type: Number, default: 1 },
    },
    daily: {
        count: { type: Number, default: 0 },
        time: { type: Date, default: new Date() },
    },
});

const Profile = mongoose.model<IProfile>('profile', profile);
export { Profile };
