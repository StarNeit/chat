import mongoose from 'mongoose';

interface IUser {
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface UserModelInterface extends mongoose.Model<IUser> {}

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      default: 'user'
    }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<
  UserDoc,
  UserModelInterface
>('User', userSchema);
