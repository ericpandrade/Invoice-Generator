/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./style.module.scss";

import Header from "../../components/Header";

import api from "../../services/api";
import { useEffect, useRef, useState } from "react";
import { Spin, Table, Card, message } from "antd";

import { BsFillFilePersonFill } from "react-icons/bs";
import { VscVmActive } from "react-icons/vsc";
import { MdPictureAsPdf } from "react-icons/md";
import { GoCloudDownload } from "react-icons/go";

import CardContainer from "../../components/Card";
import { ColumnsType } from "antd/lib/table";

import { Chart } from "react-google-charts";

import { useReactToPrint } from "react-to-print";
import DashBoardPrint from "../../components/DashBoardPrint";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

interface DataClient {
  corporateName: string;
  id: number;
  cnpj: string;
  email: string;
  taxRegime: string;
  isActive: boolean;
}

const DashBoard = () => {
  const componentRef = useRef(null);
  const navigate = useNavigate();

  const stateLogin = localStorage.getItem("@Context/StateLogin");

  const [dataClients, setDataClients] = useState<DataClient[]>([]);
  const [dataClientsActive, setDataClientsActive] = useState<DataClient[]>([]);
  const [dataClientsSimpleNational, setDataClientsSimpleNational] = useState<
    DataClient[]
  >([]);
  const [dataClientsActivePresumedProfit, setDataClientsActivePresumedProfit] =
    useState<DataClient[]>([]);

  const [loading, setLoading] = useState(false);

  const goToLoginPage = () => {
    navigate("/");
  };

  const handleDataClients = () => {
    setLoading(true);
    api
      .get("clientes")
      .then((response) => setDataClients(response.data))
      .finally(() => setLoading(false));
  };

  const handleDataClientsActive = () => {
    setLoading(true);
    api
      .get("clientes", {
        params: {
          isActive: true,
        },
      })
      .then((response) => setDataClientsActive(response.data))
      .finally(() => setLoading(false));
  };

  const handleTotalTaxRegimeSimpleNational = () => {
    setLoading(true);
    api
      .get("clientes", {
        params: {
          taxRegime: "Simples Nacional",
        },
      })
      .then((response) => setDataClientsSimpleNational(response.data))
      .finally(() => setLoading(false));
  };

  const handleTotalTaxRegimePresumedProfit = () => {
    setLoading(true);
    api
      .get("clientes", {
        params: {
          taxRegime: "Lucro Presumido",
        },
      })
      .then((response) => setDataClientsActivePresumedProfit(response.data))
      .finally(() => setLoading(false));
  };

  const checkIfUserIsLoggedIn = () => {
    if (stateLogin === "false") {
      message.warn("Você precisa estar logado para acessar essa página!", 2);
      goToLoginPage();
    }
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
    handleDataClients();
    handleDataClientsActive();
    handleTotalTaxRegimeSimpleNational();
    handleTotalTaxRegimePresumedProfit();
  }, []);

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
  ];

  const dataChart = [
    ["Regime Tributário", "Quantidade de Pessoas"],
    ["Simples Nacional", dataClientsSimpleNational.length],
    ["Lucro Presumido", dataClientsActivePresumedProfit.length],
  ];

  const optionsChart = {
    title: "Clientes por tipo de tributação",
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Dashboard Clientes",
  });

  return (
    <Spin spinning={loading}>
      <main className={styles.mainContainerDashBoard}>
        <Header />

        <section className={styles.cardsContainer}>
          <CardContainer title="Total de Clientes" value={dataClients.length}>
            <BsFillFilePersonFill transform={"scale(6.5)"} />
          </CardContainer>
          <CardContainer
            title="Clientes ativos"
            value={dataClientsActive.length}
          >
            <VscVmActive transform={"scale(6.5)"} />
          </CardContainer>

          <div className={styles.cardContainer}>
            <div>
              <button onClick={handlePrint}>
                <h1>
                  Exportar <br />
                  DashBoard
                </h1>
                <MdPictureAsPdf color="red" transform={"scale(2.0)"} />
              </button>
            </div>
            <GoCloudDownload transform={"scale(6.5)"} />
          </div>
        </section>

        <section className={styles.tableContainer}>
          <Card title="Clientes ativos" className={styles.cardAntd}>
            <Table
              columns={columns}
              dataSource={dataClientsActive}
              pagination={{ pageSize: 5 }}
              scroll={{ x: "max-content" }}
              rowKey={"id"}
            />
          </Card>
          {dataClientsActive.length !== 0 && (
            <Chart
              options={optionsChart}
              chartType="PieChart"
              data={dataChart}
              width={"100%"}
              height={"100%"}
            />
          )}
        </section>
      </main>
      <div className={styles.dashboardPrint}>
        <DashBoardPrint
          data={dataClientsActive}
          totalClients={dataClients}
          componentRef={componentRef}
          dataSimpleNational={dataClientsSimpleNational}
          dataPresumedProfit={dataClientsActivePresumedProfit}
        />
      </div>

      <Footer />
    </Spin>
  );
};

export default DashBoard;
