import mongoose, { Schema, Document } from 'mongoose';
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
//   favorites: mongoose.Types.ObjectId[];
//   recommendationsReceived: mongoose.Types.ObjectId[];
 }

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
//   favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property', default: [] }],
//   recommendationsReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property', default: [] }]
});

export default mongoose.model<IUser>('User', UserSchema);
