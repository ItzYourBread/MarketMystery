import mongoose, { Schema } from 'mongoose';
import { IProfile } from '../utils/interface/database/profile';

const profile: Schema = new Schema({
	id: { type: String, unique: true, required: true},
})

const Profile = mongoose.model<IProfile>('profile', profile);
export { Profile };