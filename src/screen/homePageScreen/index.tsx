"use client";
import React, { useState, useEffect } from "react";

import axios from "axios";

import Header from "@/components/header";
import PriceList from "@/components/pricelist";

import styles from "./styles.module.css";

const HomepageScreen = () => {
  const [prices, setPrices] = useState([]);
  const [pythPrice, setPythPrice] = useState([]);
  const [coingeckoPrice, setCoingeckoPrice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPyth, setPythLoading] = useState(true);
  const [loadingGecko, setGeckoLoading] = useState(true);

  const fetchPrice = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/average-price");
      setPrices(response.data);
    } catch (error) {
      console.error("Error fetching average price:", error);
    }
    setLoading(false);
  };

  const fetchPythPrice = async () => {
    setPythLoading(true);
    try {
      const response = await axios.get("/api/pyth-price");
      setPythPrice(response.data);
    } catch (error) {
      console.error("Error fetching pyth-price price:", error);
    }
    setPythLoading(false);
  };

  const fetchCoingeckoPrice = async () => {
    setGeckoLoading(true);
    try {
      const response = await axios.get("/api/coin-gecko");
      setCoingeckoPrice(response.data);
    } catch (error) {
      console.error("Error fetching coin-gecko price:", error);
    }
    setGeckoLoading(false);
  };

  useEffect(() => {
    fetchPrice();
    fetchPythPrice();
    fetchCoingeckoPrice();
  }, []);
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.priceList}>
          <PriceList
            title={"PYTH"}
            prices={pythPrice}
            loading={loadingPyth}
            fetchPrice={() => {
              fetchPythPrice();
              fetchPrice();
            }}
          />
        </div>
        <div className={styles.priceList}>
          <PriceList
            title={"COİNGECKO"}
            prices={coingeckoPrice}
            loading={loadingGecko}
            fetchPrice={() => {
              fetchCoingeckoPrice();
              fetchPrice();
            }}
          />
        </div>
        <div className={styles.priceList}>
          <PriceList
            title={"AVERAGE"}
            prices={prices}
            loading={loading}
            fetchPrice={fetchPrice}
          />
        </div>
      </div>
    </>
  );
};

export default HomepageScreen;
