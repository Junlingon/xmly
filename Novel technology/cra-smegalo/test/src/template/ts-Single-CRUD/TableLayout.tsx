import React, { useEffect } from 'react';
import { Table } from 'antd';
import ActionList from '@/components/ActionList';
import { useCouponContext } from './index.context';
import { deleteInvoice } from '@/services/sellerInfo';

const TableLayout = () => {
  const { dataSource, getList, pagination, setState, onEdit } =
    useCouponContext();

  useEffect(() => {
    getList();
  }, []);

  const columns = [
    {
      title: '商品发票编码',
      dataIndex: 'commodityCoding',
      key: 'commodityCoding',
    },
    {
      title: '开票类型',
      dataIndex: 'invoiceContent',
      key: 'invoiceContent',
    },
    {
      title: '商品分类',
      dataIndex: 'goodsCategory',
      key: 'goodsCategory',
    },
    {
      title: '税率',
      dataIndex: 'taxRate',
      key: 'taxRate',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作人',
      dataIndex: 'operatorName',
      key: 'operatorName',
    },
    {
      title: '状态',
      dataIndex: 'statusId',
      key: 'statusId',
      render: (value: number) => (value === 1 ? '启用' : '停用'),
    },
    {
      title: '操作',
      width: 100,
      render: (record: any) => (
        <>
          <ActionList
            columns={[
              {
                text: '编辑',
                type: 'text',
                onClick: () => onOperate(record),
              },

              {
                type: 'confirm',
                text: '删除',
                confirmText: '确定要删除当前行吗? ',
                onClick: () => onDelete(record),
              },
            ]}
          />
        </>
      ),
    },
  ];

  function onOperate(row: any) {
    onEdit(row);
  }
  function onDelete(row: any) {
    deleteInvoice({ commodityCoding: row.commodityCoding });
    getList();
  }
  function onTableChange(params: any) {
    setState({
      pagination: params,
    });

    getList({
      pageSize: params.pageSize,
      pageNum: params.current,
    });
  }

  return (
    <div>
      <Table
        rowKey="id"
        dataSource={dataSource.data}
        loading={!dataSource.done}
        columns={columns}
        pagination={pagination}
        onChange={onTableChange}
      />
    </div>
  );
};

export default TableLayout;
