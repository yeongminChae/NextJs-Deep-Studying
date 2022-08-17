import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email };
  const user = await client.user.upsert({
    // upsert : create smth and bring it from the database
    where: {
      ...payload,
    },
    create: {
      name: "Anonymous",
      ...payload,
    },
    update: {},
  });
  console.log(user);

  /*   if (email) {
    user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (user) console.log("found email");
    if (!user) {
      console.log("did not find will create");
      user = await client.user.create({
        data: {
          name: "Anomymous",
          email,
        },
      });
    }
    console.log(user);
  }
  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone: +phone, // +'1234'-> 1234 || 1234 +"" -> "1234"
      },
    });
    if (user) console.log("found phone num");
    if (!user) {
      console.log("did not find will create");
      user = await client.user.create({
        data: {
          name: "Anomymous",
          phone: +phone,
        },
      });
    }
    console.log(user);
  } */
  return res.status(200).end();
}

export default withHandler("POST", handler);
