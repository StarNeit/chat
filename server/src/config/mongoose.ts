import mongoose from 'mongoose';

require('dotenv').config();

const MONGO_URI = `mongodb://${process.env.MONGO_HOSTNAME}/${process.env.MONGO_DB}`;

mongoose.connect(MONGO_URI).then((r) => {
  console.log('Database is connected successfully');
});

mongoose.set('toJSON', {
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;

    return ret;
  },
});
