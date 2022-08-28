import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}

const client = global.client || new PrismaClient();
// const client = global.client || new PrismaClient({ log: ["query"] });
// log: ["query"] -> for getting a information about how many queries do i use in db

if (process.env.NODE_ENV === "development") global.client = client;

// export default new PrismaClient();
export default client;
