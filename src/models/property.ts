import mongoose, { Schema, Document } from "mongoose";

export interface IProperty extends Document {
  id: string;
  title: string;
  type: string;
  price: number;
  state: string;
  city: string;
  areaSqFt: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  furnished: string;
  availableFrom: Date;
  listedBy: string;
  tags: string[];
  colorTheme: string;
  rating: number;
  isVerified: boolean;
  listingType: string;
  createdBy: mongoose.Schema.Types.ObjectId;
}

const PropertySchema = new Schema<IProperty>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  type: { type: String },
  price: { type: Number },
  state: { type: String },
  city: { type: String },
  areaSqFt: { type: Number },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  amenities: [{ type: String }],
  furnished: { type: String },
  availableFrom: { type: Date },
  listedBy: { type: String },
  tags: [{ type: String }],
  colorTheme: { type: String },
  rating: { type: Number },
  isVerified: { type: Boolean },
  listingType: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model<IProperty>("Property", PropertySchema);