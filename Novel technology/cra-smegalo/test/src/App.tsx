import React, { FC } from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import XLayout from "@/pages/Xlayout";
import { BrowserRouter as Router } from "react-router-dom";

moment.locale("zh-cn");

const App: FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router basename="/gatekeeper/supply-chain-manage">
        <XLayout />
      </Router>
    </ConfigProvider>
  );
};

export default App;
