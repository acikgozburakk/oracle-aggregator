import type { NextApiRequest, NextApiResponse } from 'next';
import { PriceServiceConnection } from "@pythnetwork/price-service-client";
import axios from 'axios';
import feedInfos from "./pricesFeedInfos"; 

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

const getCoinGeckoPrice = async () => {
  try {
    const coinIds = feedInfos.Infos.map(info => info.coingeckoId).join(',');
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        ids: coinIds,
      },
    });

    const pricesWithNames = response.data.map((coin: any) => {
      const correspondingInfo = feedInfos.Infos.find(info => info.coingeckoId === coin.id);
      return {
        name: correspondingInfo?.name ?? coin.name,
        price: coin.current_price,
        icon: correspondingInfo?.icon ?? ''
      };
    });

    return pricesWithNames;
  } catch (error) {
    console.error('Error fetching CoinGecko price:', error);
    return null;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const pythPrices = await getPythPrice();
  const coingeckoPrices = await getCoinGeckoPrice();

  if (pythPrices) {
    const averagePrices = pythPrices.map(pythPrice => {
      if (coingeckoPrices) {
        const coingeckoPrice = coingeckoPrices.find((coin: any) => coin.name === pythPrice.name);
        const averagePrice = (pythPrice.price + coingeckoPrice.price) / 2;
        return {
          name: pythPrice.name,
          averagePrice,
          icon: pythPrice.icon
        };
      } else {
        return {
          name: pythPrice.name,
          averagePrice: pythPrice.price,
          icon: pythPrice.icon
        };
      }
    });
    res.status(200).json(averagePrices);
  }
}
