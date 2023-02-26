import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  let admin = await prisma.admins.findFirst();
  let user = await prisma.users.findFirst();

  if (!admin) {
    admin = await prisma.admins.create({
      data: {
        cpf: "15789465784",
        email: "admin@gmail.com",
        name: "admin",
        photo: "https://cdn-icons-png.flaticon.com/512/9512/9512709.png",
        birthDay: new Date("2000-01-01"),
        password: "123456789"
      }
    });
  }

  if (!user) {
    user = await prisma.users.create({
      data: {
        email: "admin@gmail.com",
        name: "admin",
        birthDay: new Date("2000-01-01"),
        password: "123456789"
      }
    });
  }

  console.log({ admin, user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
