import React from "react";
import PriceCard from "../priceCard";
import Loading from "../loading";
import RefreshSvg from "../../../public/refresh.svg";

import styles from "./styles.module.css";

const PriceList = ({ title, prices, loading, fetchPrice }: any) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={fetchPrice}>
        <RefreshSvg width={20} height={20} className={styles.icon} />
      </button>

      <h1 className={styles.title}>{title}</h1>

      {loading ? (
        <div className="mt-24">
          <Loading />
        </div>
      ) : (
        prices?.map((item: any) => (
          <PriceCard key={item.name} priceDetail={item} />
        ))
      )}
    </div>
  );
};

export default PriceList;
