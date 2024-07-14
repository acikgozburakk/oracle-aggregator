import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import feedInfos from "./pricesFeedInfos"; 

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
  const coingeckoPrices = await getCoinGeckoPrice();
  if (coingeckoPrices) {
    res.status(200).json(coingeckoPrices);
  } else {
    res.status(500).json({ error: 'Failed to fetch CoinGecko prices' });
  }
}
