/**
 * title: 折叠（含过渡效果）
 * description:
 */

import { FilterFormLayout } from '@xmly/mi-design';
import { Form, Input, Select } from 'antd';
import React from 'react';

export default () => {
  return (
    <FilterFormLayout
      onOk={() => {}}
      onReset={() => {}}
      IsCollapsed={true}
      labelWidth={120}
    >
      <Form.Item label="渠道商品规格编号" name="itemId">
        <Input allowClear />
      </Form.Item>
      <Form.Item label="渠道商品规格名称" name="skuName">
        <Input allowClear />
      </Form.Item>

      <Form.Item label="渠道商品名称" name="itemName">
        <Input allowClear />
      </Form.Item>

      <Form.Item label="物料编码" name="materialCode">
        <Select allowClear mode="tags" tokenSeparators={[',']} />
      </Form.Item>
      <Form.Item label="发货方式" name="shipType">
        <Select
          options={[
            {
              value: 1,
              label: '喜马仓库',
            },
            {
              value: 2,
              label: '供应商（发货、退货）',
            },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item label="发货时间规则" name="shipTimeRule">
        <Select
          allowClear
          options={[
            {
              value: 0,
              label: '立即履约',
            },
            {
              value: 1,
              label: '延时履约',
            },
          ]}
        ></Select>
      </Form.Item>
    </FilterFormLayout>
  );
};
