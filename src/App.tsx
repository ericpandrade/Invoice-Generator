import Router from "./routes/routes";

import "./global.scss";
import "antd/dist/antd.min.css";

import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";

import "react-toastify/dist/ReactToastify.css";

import { UserNameProvider } from "./context/usernameContext";

function App() {
  return (
    <ConfigProvider locale={ptBR}>
      <UserNameProvider>
        <Router />
      </UserNameProvider>
    </ConfigProvider>
  );
}

export default App;
