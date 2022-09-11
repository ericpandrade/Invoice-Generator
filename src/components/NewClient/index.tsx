import styles from "./style.module.scss";
import { useState } from "react";

import { IoIosAddCircleOutline } from "react-icons/io";
import { TiTickOutline } from "react-icons/ti";

import { Form, Modal, Select, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";

import Input from "antd/lib/input/Input";
import ReactInputMask from "react-input-mask";

import api from "../../services/api";

interface IFormData {
  corporateName: string;
  email: string;
  taxRegime: string;
  cnpj: string;
}

interface IProps {
  actualizeTable: () => void;
}

const NewClient = (props: IProps) => {
  const [form] = useForm();
  const { Option } = Select;

  const [controlStateModal, setControlStateModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => setControlStateModal(!controlStateModal);

  const createANewUser = (data: IFormData) => {
    const treatedObject = {
      corporateName: data.corporateName.trim(),
      email: data.email.trim(),
      taxRegime: data.taxRegime.trim(),
      cnpj: data.cnpj.trim(),
      isActive: true,
    };

    setLoading(true);
    api
      .post("/clientes", treatedObject)
      .then(() => {
        props.actualizeTable();
        toggleModal();
        form.resetFields();
      })
      .finally(() => setLoading(false));
  };

  return (
    <Spin spinning={loading}>
      <div className={styles.apresentationContainer}>
        <h1>Controle de Clientes</h1>

        <button onClick={toggleModal}>
          Cadastrar um novo Cliente
          <IoIosAddCircleOutline color="white" transform="scale(1.6)" />
        </button>

        <Modal
          width={1000}
          title="Cadastrar um novo Cliente"
          open={controlStateModal}
          onCancel={toggleModal}
          footer={null}
          style={{ minWidth: "310px" }}
        >
          <Form layout="vertical" form={form} onFinish={createANewUser}>
            <Form.Item
              name="corporateName"
              label="Razão Social"
              rules={[
                {
                  required: true,
                  message: "Esse campo é obrigatório",
                },
              ]}
            >
              <Input type="text" placeholder="Razão Social" />
            </Form.Item>

            <Form.Item
              name="cnpj"
              label="CNPJ"
              rules={[
                {
                  required: true,
                  message: "Esse campo é obrigatório",
                },
                {
                  min: 18,
                  message: "CNPJ deve ter no mínimo 18 dígitos",
                },
              ]}
            >
              <ReactInputMask
                type="text"
                className="ant-input"
                mask={"99.999.999/9999-99"}
                placeholder="99.999.999/9999-99"
                minLength={18}
              />
            </Form.Item>

            <Form.Item
              name="taxRegime"
              label="Regime Tributário"
              rules={[
                {
                  required: true,
                  message: "Esse campo é obrigatório",
                },
              ]}
            >
              <Select placeholder="Selecione">
                <Option value="Simples Nacional">Simples Nacional</Option>

                <Option value="Lucro Presumido">Lucro Presumido</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  required: true,
                  message: "Esse campo é obrigatório",
                },
              ]}
            >
              <Input type="email" placeholder="exemplo@gmail.com" />
            </Form.Item>

            <div className={styles.finalizeButton}>
              <button type="submit">
                Finalizar{" "}
                <TiTickOutline
                  color={"var(--primary-color)"}
                  transform={"scale(1.5)"}
                />
              </button>
            </div>
          </Form>
        </Modal>
      </div>
    </Spin>
  );
};

export default NewClient;
