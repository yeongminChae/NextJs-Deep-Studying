import twilio from "twilio";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import smtpTransport from "@libs/server/email";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.PHONE_NUM!, // PHONE_NUM! -> it's for sure that is exist in env
    //   body: `your login token is ${payload}.`,
    // });
    // console.log(message);
  } else if (email) {
    // const mailOption = {
    //   from: process.env.MAIL_ID,
    //   to: email,
    //   subject: "Nomad Carrot Authentication Email",
    //   text: `Authentication Code : ${payload}`,
    //   html: "<strong>Authentication Code : ${payload}",
    // };
    // const result = await smtpTransport.sendMail(
    //   mailOption,
    //   (error, response) => {
    //     if (error) {
    //       console.log(error);
    //       return null;
    //     } else {
    //       console.log(response);
    //       return null;
    //     }
    //   }
    // );
    // smtpTransport.close();
    // console.log(result);
  }
  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
