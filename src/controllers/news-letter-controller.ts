import { Request, Response } from "express";
import newsLetterService from "@/services/news-letter-service";
import httpStatus from "http-status";

export async function insertOnNewsLetter(req: Request, res: Response) {
  const { email } = req.body;

  try {
    await newsLetterService.insertParticipant(email);

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === "AlreadyRegisteredError") return res.status(httpStatus.CONFLICT).send(error);

    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
