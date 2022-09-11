import styles from "./style.module.scss";

import { useUsernameContext } from "../../context/usernameContext";

import { useNavigate } from "react-router-dom";
import { message } from "antd";

import invoicesIcon from "../../assets/icons/invoices.svg";
import { memo } from "react";

const Header = () => {
  const { handleDataUsername } = useUsernameContext();
  const navigate = useNavigate();

  const controlNavigate = {
    goToLoginPage: () => {
      navigate("/");
    },
    goToInvoicePage: () => {
      navigate("/invoices");
    },
  };

  const logout = () => {
    localStorage.removeItem("@Context/DataUsername");
    localStorage.setItem("@Context/StateLogin", "false");

    message.success("Você saiu da sua conta com sucesso!", 2);

    controlNavigate.goToLoginPage();
  };

  return (
    <section className={styles.sectionHeader}>
      <button
        className={styles.buttonClean}
        onClick={controlNavigate.goToInvoicePage}
      >
        <img src={invoicesIcon} alt="Ícone de uma nota fiscal" />
      </button>
      <div className={styles.containerInformations}>
        <h1>Bem vindo, {handleDataUsername}!</h1>
        <button
          className={styles.stockControl}
          onClick={controlNavigate.goToInvoicePage}
        >
          Controle de Clientes
        </button>
        <button className={styles.exitButton} onClick={logout}>
          SAIR
        </button>
      </div>
    </section>
  );
};

export default memo(Header);
