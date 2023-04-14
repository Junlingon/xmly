import React, { FC } from 'react';
import { Table } from 'antd';
import { formatWidth } from './table.untils';

interface Props {
  columns: any;
  data: any[];
  onChange?: (pagination: any) => void;
  pagination?: { current?: number; total: number } | boolean;
  loading?: boolean;
  rowKey?: string;
  scroll?: { x?: string | number | true; y?: number | string };
}

const defaultPagination = {
  hideOnSinglePage: true,
  showTotal: (total: number) => `共 ${total} 条`,
  showSizeChanger: false,
};

const TableLayout: FC<Props> = (props: Props) => {
  const {
    columns,
    data,
    pagination,
    onChange,
    loading,
    rowKey = 'id',
    scroll,
  } = props;

  return (
    <Table
      size="middle"
      columns={formatWidth(columns)}
      dataSource={data}
      pagination={
        typeof pagination === 'object'
          ? { ...defaultPagination, ...pagination }
          : false
      }
      rowKey={rowKey}
      onChange={onChange}
      loading={loading}
      scroll={scroll}
    />
  );
};

export default TableLayout;
