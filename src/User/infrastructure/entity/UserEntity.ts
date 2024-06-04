import mongoose, { Schema, Document } from 'mongoose';

export interface IUserEntity extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  address?: string;
  birthDate?: Date;
  codePostal?: string;
  country?: string;
  city?: string;
  role?: string;
  createdAt?: Date;
  image?: string;
  fonction?: string;
  myProject?: mongoose.Types.ObjectId[];
  resetLink?: string;
  status?: string;
  description?: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String },
  birthDate: { type: Date },
  codePostal: { type: String },
  country: { type: String },
  city: { type: String },
  role: { type: String },
  createdAt: { type: Date, default: Date.now },
  image: { type: String },
  fonction: { type: String },
  myProject: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  resetLink: { type: String },
  status: { type: String },
  description: { type: String }
});

export default mongoose.model<IUserEntity>('User', UserSchema);
