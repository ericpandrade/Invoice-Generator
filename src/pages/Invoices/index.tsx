/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUsernameContext } from "../../context/usernameContext";

import styles from "./style.module.scss";

import { message, Spin, Table } from "antd";

import api from "../../services/api";

import { useForm } from "antd/lib/form/Form";

import { toast, ToastContainer } from "react-toastify";
import NewClient from "../../components/NewClient";
import EditUser from "../../components/EditUser";

import { ColumnsType } from "antd/lib/table";

import { RiDeleteBin7Line, RiEdit2Line } from "react-icons/ri";

import { MdDesktopAccessDisabled } from "react-icons/md";
import { VscVmActive } from "react-icons/vsc";

import { BsClipboardData } from "react-icons/bs";
import Footer from "../../components/Footer";

interface DataClient {
  corporateName: string;
  id: number;
  cnpj: string;
  email: string;
  taxRegime: string;
  isActive: boolean;
}

const Invoices = () => {
  const { handleDataUsername } = useUsernameContext();

  const stateLogin = localStorage.getItem("@Context/StateLogin");

  const [form] = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [dataClients, setDataClients] = useState<DataClient[]>([]);

  const [controlModalStateEditUser, setControlModalStateEditUser] =
    useState(false);

  const controlNavigate = {
    goToLoginPage: () => {
      navigate("/");
    },
    goToDashBoard: () => {
      navigate("/dashboard");
    },
  };

  const checkIfUserIsLoggedIn = () => {
    if (stateLogin === "false" || !stateLogin) {
      message.warn("Você precisa estar logado para acessar essa página!", 2);
      controlNavigate.goToLoginPage();
    }
  };

  const handleDataClients = () => {
    setLoading(true);
    api
      .get("/clientes")
      .then((response) => {
        setDataClients(response.data);
      })
      .catch(() =>
        toast.error("Aconteceu algo de inesperado!", {
          theme: "light",
          autoClose: 2000,
        })
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
    handleDataClients();
  }, []);

  const toggleDisableClient = (client: DataClient) => {
    const toggleClient = {
      corporateName: client.corporateName.trim(),
      email: client.email.trim(),
      taxRegime: client.taxRegime.trim(),
      cnpj: client.cnpj.trim(),
      isActive: client.isActive ? false : true,
    };

    setLoading(true);
    api
      .put(`/clientes/${client.id}`, toggleClient)
      .then((response) => {
        toast.success(
          client.isActive
            ? "Usuário desabilitado com sucesso!"
            : "Usuário restaurado com sucesso!",
          {
            theme: "light",
            autoClose: 2000,
          }
        );
        handleDataClients();
      })
      .finally(() => setLoading(false));
  };

  const deleteUser = (id: number) => {
    api
      .delete(`/clientes/${id}`)
      .then((response) => {
        toast.success("Usuário removido com sucesso!", {
          theme: "light",
          autoClose: 2000,
        });
        handleDataClients();
      })
      .finally(() => setLoading(false));
  };

  const toggleModalEditUser = () => {
    setControlModalStateEditUser(!controlModalStateEditUser);
  };

  const columns: ColumnsType<DataClient> = [
    {
      title: "Razão Social",
      dataIndex: "corporateName",
      render: (corporateName) => <span>{corporateName}</span>,
    },
    {
      title: "CNPJ",
      dataIndex: "cnpj",
      render: (cnpj) => <span>{cnpj}</span>,
    },
    {
      title: "Regime Tributário",
      dataIndex: "taxRegime",
      render: (taxRegime) => <span>{taxRegime}</span>,
    },
    {
      title: "E-mail",
      dataIndex: "email",
      render: (email) => <span>{email}</span>,
    },
    {
      title: null,
      render: (record: DataClient) => (
        <div className={styles.containerControllersButton}>
          <button
            aria-label={record.isActive ? "Desabilitar" : "Restaurar"}
            className={styles.removeButton}
            onClick={() => toggleDisableClient(record)}
          >
            {record.isActive ? (
              <MdDesktopAccessDisabled
                color="#BBCBCB"
                transform="scale(1.35)"
              />
            ) : (
              <VscVmActive
                color="var(--primary-color) "
                transform="scale(1.35)"
              />
            )}
          </button>
          <button aria-label="Deletar" onClick={() => deleteUser(record.id)}>
            <RiDeleteBin7Line color="#F50" transform="scale(1.35)" />
          </button>
          <button
            aria-label="Editar"
            onClick={() => handleDataClientToModalEditUser(record.id)}
          >
            <RiEdit2Line color="var(--primary-color)" transform="scale(1.35)" />
          </button>

          <EditUser
            form={form}
            toggleModal={toggleModalEditUser}
            modalState={controlModalStateEditUser}
            clientData={record}
            actualizeTable={handleDataClients}
          />
        </div>
      ),
    },
  ];

  const handleDataClientToModalEditUser = (id: number) => {
    setLoading(true);

    api
      .get(`/clientes/${id}`)
      .then((response) => {
        form.setFieldsValue({
          corporateName: response.data.corporateName,
          email: response.data.email,
          taxRegime: response.data.taxRegime,
          cnpj: response.data.cnpj,
        });

        toggleModalEditUser();
      })
      .catch(() =>
        toast.error("Aconteceu algo de inesperado!", {
          theme: "light",
          autoClose: 2000,
        })
      )
      .finally(() => setLoading(false));
  };

  const logout = () => {
    localStorage.removeItem("@Context/DataUsername");
    localStorage.setItem("@Context/StateLogin", "false");

    message.success("Você saiu da sua conta com sucesso!", 2);

    controlNavigate.goToLoginPage();
  };

  return (
    <Spin spinning={loading}>
      <main className={styles.mainContainerInvoices}>
        <header className={styles.headerContainer}>
          <h1>
            Bem vindo ao Controle de Clientes,{" "}
            <strong>{handleDataUsername}</strong>!
          </h1>
        </header>

        <section className={styles.sectionContainer}>
          <NewClient actualizeTable={handleDataClients} />

          <Table
            columns={columns}
            dataSource={dataClients}
            pagination={{ pageSize: 5 }}
            tableLayout="auto"
            scroll={{ x: "max-content" }}
            rowKey={"id"}
            style={{ margin: "3rem 0" }}
            className={styles.table}
          />

          <div className={styles.containerButtons}>
            <button onClick={() => controlNavigate.goToDashBoard()}>
              Painel de Controle{" "}
              <BsClipboardData color="white" transform="scale(1.15)" />
            </button>
            <button onClick={logout}>Deslogar</button>
          </div>
        </section>

        <Footer />

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
      </main>
    </Spin>
  );
};

export default Invoices;
