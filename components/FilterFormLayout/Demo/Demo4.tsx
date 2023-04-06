/**
 * title: 普通
 * description: 通过设置onCreate等相关函数展示相关按钮
 */

import { FilterFormLayout } from '@xmly/mi-design';
import { Form, Input, Select } from 'antd';
import React from 'react';

export default () => {
  return (
    <FilterFormLayout
      onCreate={() => {}}
      onBatchOutput={() => {}}
      onBatchInput={() => {}}
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
