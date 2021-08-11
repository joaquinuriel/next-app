import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.send("hello world");
  //   res.status(200).json(req.query);
  fetch("/sw.js", {
      method: "post",
  });
}
