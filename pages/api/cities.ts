// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const citiesURL = 'https://docs.openaq.org/v2/cities?country=GB&limit=200';

const getCities = async () => {
  const json = await fetch(citiesURL, {
    method: 'GET',
  }).then((response) => response.json());

  const listOfCities = json.results.map(({ city }: any): string => city);

  return listOfCities;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const listOfCities = await getCities();
    res.status(200).send(listOfCities);
  } catch (err: unknown) {
    res.status(500).send(err);
  }
}
