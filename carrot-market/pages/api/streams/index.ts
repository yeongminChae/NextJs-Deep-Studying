import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: { name, price, description },
  } = req;
  if (req.method === "POST") {
    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      stream,
    });
  }
  if (req.method === "GET") {
    const streamPages = await client.stream.count();
    const rowCnt = await client.stream.count({
      select: {
        _all: true,
      },
    });
    let page =
      req.query.page && req.query.page !== undefined
        ? +req.query?.page?.toString()
        : 1;
    const streams = await client.stream.findMany({
      take: 10,
      skip: (+page - 1) * 10,
    });
    res.json({
      ok: true,
      streams,
      rowCnt,
      pages: Math.ceil(streamPages / 10),
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
    isPrivate: false,
  })
);
