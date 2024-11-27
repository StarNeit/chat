import { Request, Response, NextFunction } from 'express';
import { MessageModel } from "../models";

export async function getMessagesById(req: Request, res: Response, next: NextFunction) {
  try {
    const messages = await MessageModel
      .find({ channelId: req.params.channelId })
      .sort({ created: 1 })
      .limit(10)
      .populate('userId');

    return res.json({
      data: messages
    })
  } catch (err) {
    next(err);
  }
}
