import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { ChannelModel, MessageModel } from '../models';
import { handleError } from '../errors/handleError';

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const channels = await ChannelModel.find({});

    return res.json({
      data: channels
    })
  } catch (err) {
    next(err);
  }
}

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const channel = await ChannelModel.findOne({ _id: id }).populate('users');
    const totalMessages = await MessageModel.countDocuments({ channelId: id });
    const lastMessages = await MessageModel.find({
      channelId: id,
      createdAt: {
        $gte: new Date(new Date().getMinutes() - 5)
      }
    }).populate('userId');

    res.json({
      data: {
        channel,
        total: totalMessages,
        last: lastMessages
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const channel = new ChannelModel({
      ...req.body,
      password: req.body.password ? bcrypt.hashSync(req.body.password as string, 10) : ''
    });
    await channel.save();

    res.status(201).json({
      message: 'Successfully created',
    });
  } catch (err) {
    next(err);
  }
}

export async function confirmChannel(req: Request, res: Response, next: NextFunction) {
  try {
    const { password, id } = req.body;

    const channel = await ChannelModel.findById(id);

    if (channel && bcrypt.compareSync(password, channel.password)) {
      return res.status(200).json({
        message: 'Password is matched',
      });
    } else {
      return handleError(res, 400, 'Password is not matched');
    }
  } catch (err) {
    next(err);
  }
}

export async function removeUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { channelId, userId } = req.body;

    const channel = await ChannelModel.findById(channelId);

    if (channel) {
      const newUsers = channel.users.filter((item) => item !== userId);
      await ChannelModel.updateOne({ _id: channelId }, {
        users: newUsers
      });

      return res.status(200).json({
        message: 'Successfully deleted',
      });
    }

    return res.status(404).json({
      message: 'Channel does not exist',
    });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    await ChannelModel.deleteOne({ _id: id });

    return res.status(200).json({
      message: 'Successfully deleted',
    });
  } catch (err) {
    next(err);
  }
}
