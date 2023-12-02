import { Schema, models, model, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  name: string;
  email: string;
  username: string;
  password?: string;
  bio?: string;
  picture?: string;
  location?: string;
  portfolioWebsite?: string;
  githubUsername?: string;
  reputation?: number;
  savedQuestions?: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  bio: {
    type: String,
  },
  picture: {
    type: String,
  },
  location: {
    type: String,
  },
  portfolioWebsite: {
    type: String,
  },
  githubUsername: {
    type: String,
  },
  reputation: {
    type: Number,
    default: 0,
  },
  savedQuestions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model<IUser>('User', UserSchema);

export default User;
