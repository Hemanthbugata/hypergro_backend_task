import mongoose, { Schema, Document } from 'mongoose';
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin'; 
  favorites: string[]; 
  recommendationsReceived: string[];
 }

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  favorites: [{ type:String, ref: 'Property' }],
  recommendationsReceived: [{ type: String, ref: 'Property' }],
});

export default mongoose.model<IUser>('User', UserSchema);
