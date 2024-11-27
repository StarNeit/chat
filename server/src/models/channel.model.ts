import mongoose from 'mongoose';

interface IChannel {
  name: string;
  users: string[];
  private: boolean;
  password: string;
}

interface ChannelDoc extends mongoose.Document {
  name: string;
  users: string[];
  private: boolean;
  password: string;
}

interface ChannelModelInterface extends mongoose.Model<IChannel> {}

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    private: {
      type: Boolean,
      default: false,
    },
    password: String,
    users: [
      {
        type: String,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
);

export const ChannelModel = mongoose.model<
  ChannelDoc,
  ChannelModelInterface
>('Channel', channelSchema);
