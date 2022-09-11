/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./style.module.scss";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useUsernameContext } from "../../context/usernameContext";

import { toast, ToastContainer } from "react-toastify";

import { message } from "antd";

interface ILogin {
  username: string;
}

const Login = () => {
  const { setHandleDataUsername } = useUsernameContext();
  const { register, handleSubmit } = useForm<ILogin>();

  const navigate = useNavigate();

  const goToInvoicePage = () => {
    navigate("/invoices");
  };

  const checkIfUserIsLogged = () => {
    const stateLogin = localStorage.getItem("@Context/StateLogin");

    if (stateLogin === "true") {
      message.warn("Você já está logado!", 2);
      goToInvoicePage();
    }
  };

  useEffect(() => {
    checkIfUserIsLogged();
  }, []);

  const verifyFieldUsername = (data: ILogin) => {
    const isVerified = !data.username ? true : false;

    return isVerified;
  };

  const onSubmit = (data: ILogin) => {
    if (verifyFieldUsername(data)) {
      const ERROR_MESSAGE_FIELD_IS_EMPTY =
        "Por favor, preencha o campo de usuário.";

      toast.error(ERROR_MESSAGE_FIELD_IS_EMPTY, {
        theme: "light",
        autoClose: 2000,
      });
    } else {
      const usernameFormated = data.username.trim();
      setHandleDataUsername(usernameFormated);

      localStorage.setItem("@Context/StateLogin", "true");

      goToInvoicePage();
    }
  };

  return (
    <section className={styles.formAside}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.loginText}>Log in</h1>
        <div className={styles.formContainer}>
          <div className={styles.usernameContainer}>
            <label htmlFor="username">Nome de usuário</label>
            <input
              {...register("username")}
              type="text"
              name="username"
              placeholder="Digite seu nome de usuário"
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </div>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
};

export default Login;
