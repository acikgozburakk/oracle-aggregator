import React from "react";
import Image from "next/image";

import styles from "./styles.module.css";

const PriceCard = ({ priceDetail }: any) => {
  return (
    <div className={styles.wrapper}>
      <Image
        className={styles.logo}
        width={60}
        height={60}
        src={priceDetail.icon}
        alt={priceDetail.name}
      ></Image>
      <span className={styles.name}>{priceDetail.name}</span>:
      <span className={styles.price}>
        {priceDetail.averagePrice || priceDetail.price}
      </span>
    </div>
  );
};

export default PriceCard;
