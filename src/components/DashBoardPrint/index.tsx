import styles from "./style.module.scss";

import { memo } from "react";

import { Table, Card } from "antd";
import { ColumnsType } from "antd/lib/table";

import { Chart } from "react-google-charts";

import CardContainer from "../Card";

import { BsFillFilePersonFill } from "react-icons/bs";
import { VscVmActive } from "react-icons/vsc";

interface DataClient {
  corporateName: string;
  id: number;
  cnpj: string;
  email: string;
  taxRegime: string;
  isActive: boolean;
}

interface IProps {
  data: DataClient[];
  totalClients: DataClient[];
  componentRef: React.MutableRefObject<null>;
  dataSimpleNational: DataClient[];
  dataPresumedProfit: DataClient[];
}

const DashBoardPrint = (props: IProps) => {
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
    ["Simples Nacional", props.dataSimpleNational.length],
    ["Lucro Presumido", props.dataPresumedProfit.length],
  ];

  const optionsChart = {
    title: "Clientes por tipo de tributação",
    width: 500,
    height: 400,
    pieSliceText: "none",
  };

  return (
    <main ref={props.componentRef}>
      <section className={styles.cardsContainer}>
        <CardContainer
          title="Total de Clientes"
          value={props.totalClients.length}
        >
          <BsFillFilePersonFill transform={"scale(6.5)"} />
        </CardContainer>
        <CardContainer title="Clientes ativos" value={props.data.length}>
          <VscVmActive transform={"scale(6.5)"} />
        </CardContainer>
      </section>
      <section className={styles.tableContainer}>
        {props.data.length !== 0 && (
          <Chart
            options={optionsChart}
            chartType="PieChart"
            data={dataChart}
            width={"100%"}
            height={"100%"}
            className={styles.chart}
          />
        )}
        <Card title="Clientes ativos" className={styles.cardAntd}>
          <Table
            columns={columns}
            dataSource={props.data}
            rowKey={"id"}
            tableLayout="auto"
            pagination={{ pageSize: Infinity }}
            style={{ marginTop: "1rem" }}
          />
        </Card>
      </section>
    </main>
  );
};

export default memo(DashBoardPrint);
