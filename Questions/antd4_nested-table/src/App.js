import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { BrowserRouter as Router } from 'react-router-dom';
import TableLayout from './pages/Layout';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router basename="/questions/antd-table">
        <TableLayout />
      </Router>
    </ConfigProvider>
  );
}

export default App;
