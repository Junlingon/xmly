import { Form, Input, Button } from 'antd';
import React from 'react';
import { useCouponContext } from './index.context';

const FilterForm = () => {
  const [form] = Form.useForm();

  const { filterForm, setFilterForm, resetFilterForm, onCreate, getList } =
    useCouponContext();

  function onFinish() {
    getList(filterForm);
  }

  function onRest() {
    form.resetFields();
    resetFilterForm();
  }

  function _onCreate() {
    onCreate();
  }

  return (
    <Form
      form={form}
      labelCol={{ flex: '100px' }}
      wrapperCol={{ style: { maxWidth: 'calc(100% - 100px)' } }}
      layout="horizontal"
      onValuesChange={setFilterForm}
      onFinish={onFinish}
    >
      <div className="flex flex-wrap">
        <div style={{ width: 300 }}>
          <Form.Item label="商品发票编码" name="commodityCoding">
            <Input />
          </Form.Item>
        </div>

        <div className="flex justify-end ml-5 mb-3">
          <Button htmlType="submit" type="primary" className="mr-3">
            查询
          </Button>
          <Button className="mr-10" onClick={onRest}>
            重置
          </Button>
          <Button type="primary" onClick={_onCreate}>
            创建开票信息
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default FilterForm;
