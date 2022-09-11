import styles from "./style.module.scss";

import ClipLoader from "react-spinners/ClipLoader";

import { memo } from "react";

const SuspenseLoading = () => {
  return (
    <div className={styles.loadingContainer}>
      <ClipLoader color={"#15b273"} size={150} />
    </div>
  );
};

export default memo(SuspenseLoading);
