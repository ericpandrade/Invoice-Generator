import styles from "./style.module.scss";

import githubIcon from "../../assets/icons/github.svg";
import linkedinIcon from "../../assets/icons/mail.svg";
import mailIcon from "../../assets/icons/linkedin.svg";
import { memo } from "react";

const Footer = () => {
  return (
    <footer className={styles.contactFooter}>
      <button type="button">
        <a
          href="https://www.linkedin.com/in/ericpandrade085/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={githubIcon} alt="Icone do GitHub" />
        </a>
      </button>
      <button type="button">
        <a
          href="https://github.com/ericpandrade"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedinIcon} alt="Icone do Linkedin" />
        </a>
      </button>
      <button type="button">
        <a
          href="mailto:ericpandrade@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={mailIcon} alt="Icone do Gmail" />
        </a>
      </button>
    </footer>
  );
};

export default memo(Footer);
