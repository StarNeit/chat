import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models";
import { handleError } from "../errors/handleError";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) return handleError(res, 404, 'User does not exist');

    return res.json({
      data: user
    })
  } catch (err) {
    next(err);
  }
}

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) return handleError(res, 404, 'User does not exist');

    return res.json({
      data: user
    })
  } catch (err) {
    next(err);
  }
}