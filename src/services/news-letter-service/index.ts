import { alreadyRegistered } from "@/errors";
import newsLetterRepository from "@/repositories/news-letter-repository";
import { newsletter } from "@prisma/client";

export async function insertParticipant(email: string): Promise<void> {
  const registered = await newsLetterRepository.findUnique(email);

  if (registered) throw alreadyRegistered(email);

  await newsLetterRepository.insert(email);
}

const newsLetterService = {
  insertParticipant
};

export type NewsLetterParams = Pick<newsletter, "email">;

export default newsLetterService;
