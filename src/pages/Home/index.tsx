import styles from "./style.module.scss";
import home from "../../assets/Home.svg";

import Login from "../../components/Login";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <main className={styles.mainContainer}>
      <section className={styles.apresentationAside}>
        <img
          src={home}
          alt="Pessoa sentada na tela de um computador segurando uma folha"
        />
      </section>
      <Login />

      <Footer />
    </main>
  );
};

export default Home;
