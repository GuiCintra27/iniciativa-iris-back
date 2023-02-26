import { prisma } from "@/config";
import { newsletter } from "@prisma/client";

function insert(email: string): Promise<void> {
  prisma.newsletter.create({
    data: { email }
  });

  return;
}

function findUnique(email: string): Promise<newsletter> {
  return prisma.newsletter.findUnique({
    where: {
      email
    }
  });
}

const newsLetterRepository = {
  insert,
  findUnique
};

export default newsLetterRepository;
