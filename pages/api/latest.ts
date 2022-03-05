// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const getLatest = async ({cityName}: {cityName: string}) => {
  const latestURL = `https://docs.openaq.org/v2/latest?country=GB&city=${cityName}`;
  const json = await fetch(latestURL, {
    method: "GET",
  }).then((response) => response.json());

  return json;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const latest = await getLatest({cityName: req.query.city as string})
    res.status(200).send(latest);
  } catch (err: unknown) {
    console.error(err);
    res.status(500).send(err);
  }
}
