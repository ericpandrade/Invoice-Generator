/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";

import styles from "./style.module.scss";

import api from "../../services/api";

import { FormInstance } from "antd/lib/form/Form";

import { TiTickOutline } from "react-icons/ti";

import { Form, Modal, Input, Select, Spin } from "antd";
import ReactInputMask from "react-input-mask";

import { toast, ToastContainer } from "react-toastify";

interface DataClient {
  corporateName: string;
  id: number;
  cnpj: string;
  email: string;
  taxRegime: string;
  isActive: boolean;
}

interface IProps {
  modalState: boolean;
  clientData: DataClient;
  form: FormInstance<any>;
  toggleModal: () => void;
  actualizeTable: () => void;
}

interface IFormData {
  corporateName: string;
  email: string;
  taxRegime: string;
  cnpj: string;
}

const EditUser = (props: IProps) => {
  const [loading, setLoading] = useState(false);

  const { Option } = Select;

  const editUser = (data: IFormData) => {
    const treatedObject = {
      corporateName: data.corporateName.trim(),
      email: data.email.trim(),
      taxRegime: data.taxRegime.trim(),
      cnpj: data.cnpj.trim(),
      isActive: props.clientData.isActive,
    };

    setLoading(true);

    api
      .put(`/clientes/${props.clientData.id}`, treatedObject)
      .then(() => {
        toast.success("Usuário editado com sucesso!", {
          theme: "light",
          autoClose: 2000,
        });
        props.actualizeTable();
        props.toggleModal();
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal
      onCancel={props.toggleModal}
      open={props.modalState}
      title={`Editar usuário ${props.clientData.corporateName}`}
      footer={null}
    >
      <Spin spinning={loading}>
        <Form layout="vertical" form={props.form} onFinish={editUser}>
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
      </Spin>
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
    </Modal>
  );
};

export default EditUser;
