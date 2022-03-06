// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

/* Why do we even have our own API? 
   We are grabbing the information from the API after
   the page loads - on the client side.  This produces a CORS error - 
   docs.openaq.org isn't the same host as our own host. 
   However, by serving an endpoint which basically acts
   as a "pass-through" for the third-party API on the same
   host, we don't have to worry about CORS. */
const getLatest = async ({ cityName }: { cityName: string }) => {
  const latestURL = `https://docs.openaq.org/v2/latest?country=GB&city=${cityName}`;
  const json = await fetch(latestURL, {
    method: 'GET',
  }).then((response) => response.json());

  return json;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const latest = await getLatest({ cityName: req.query.city as string });
    res.status(200).send(latest);
  } catch (err: unknown) {
    console.error(err);
    res.status(500).send(err);
  }
}
