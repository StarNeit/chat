import mongoose from 'mongoose';

interface IMessage {
  message: string;
}

interface MessageDoc extends mongoose.Document {
  message: string;
}

interface MessageModelInterface extends mongoose.Model<IMessage> {}

const messageSchema = new mongoose.Schema(
  {
    message: String,
    channelId: {
      type: String,
      ref: 'Channel'
    },
    userId: {
      type: String,
      ref: 'User'
    },
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model<
  MessageDoc,
  MessageModelInterface
>('Message', messageSchema);
