import mongoose from 'mongoose';
import { IProfile } from '../utils/interface/database/profile';
declare const Profile: mongoose.Model<IProfile, {}, {}, {}, any>;
export { Profile };
