import { insertOnNewsLetter } from "@/controllers";
import { validateBody } from "@/middlewares";
import { newsLetterSchema } from "@/schemas";
import { Router } from "express";

const newsLetterRouter = Router();

newsLetterRouter.post("/news-letter", validateBody(newsLetterSchema), insertOnNewsLetter);

export { newsLetterRouter };
