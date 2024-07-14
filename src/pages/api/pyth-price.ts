import type { NextApiRequest, NextApiResponse } from 'next';
import { PriceServiceConnection } from "@pythnetwork/price-service-client";
import feedInfos from "./pricesFeedInfos.js"; 

const HERMES_URL = "https://hermes.pyth.network/";
const priceServiceConnection = new PriceServiceConnection(HERMES_URL, {});

const getPythPrice = async () => {
  try {
    const feedIds = feedInfos.Infos.map((info: any) => info.feedId);
    const priceUpdateData = await priceServiceConnection.getLatestPriceFeeds(feedIds);

    if (!priceUpdateData) {
      return null;
    }

    const pricesWithNames = priceUpdateData.map((priceData: any, index: number) => {
      const correspondingInfo = feedInfos.Infos[index];
      const rawPrice = parseInt(priceData.price.price, 10);
      const expo = parseInt(priceData.price.expo, 10);
      const actualPrice = rawPrice * Math.pow(10, expo);

      return {
        name: correspondingInfo.name,
        price: actualPrice,
        icon: correspondingInfo.icon
      };
    });

    return pricesWithNames;
  } catch (error) {
    console.error('Error fetching Pyth price:', error);
    return null;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const pythPrices = await getPythPrice();
  if (pythPrices) {
    res.status(200).json(pythPrices);
  } else {
    res.status(500).json({ error: 'Failed to fetch Pyth prices' });
  }
}
