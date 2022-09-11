import React from "react";
import styles from "./style.module.scss";

interface IProps {
  title: string;
  value?: number;
  children: React.ReactNode;
}

const CardContainer = (props: IProps) => {
  return (
    <>
      <div className={styles.cardContainer}>
        <div>
          <h1>{props.title}</h1>
          <h2>{props.value}</h2>
        </div>
        {props.children}
      </div>
    </>
  );
};

export default CardContainer;
