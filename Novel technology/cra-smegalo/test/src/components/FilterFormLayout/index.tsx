import { Form, Button, Row, Col } from 'antd';
import React, { FC } from 'react';
import { isFunction } from 'lodash';
import './index.scoped.scss';

interface Props {
  onOk: (formData: any) => void; // 查询回调
  children: React.ReactNode[]; // 表单内容
  onCreate?: () => void; // 新增
  onReset?: () => void; // 重置回调
  onValuesChange?: (changedValues: any, allValues: any) => void; // 重置回调
  initialValues?: any; // 表单初始值
  labelCol?: { span?: number; lg?: number; xl?: number };
  wrapperCol?: { span?: number; lg?: number; xl?: number };
  layout?: 'horizontal' | 'vertical' | 'inline';
}

const FilterFormLayout: FC<Props> = (props: Props) => {
  const {
    onOk,
    onReset,
    onCreate,
    onValuesChange,
    initialValues = {},
    labelCol = { span: 9 },
    wrapperCol = { span: 15 },
    children,
    layout,
  } = props;

  const [form] = Form.useForm();

  function _onFinish() {
    if (isFunction(onOk)) onOk(form.getFieldsValue());
  }

  function _onValuesChange(changedValues: any, allValues: any) {
    if (isFunction(onValuesChange)) onValuesChange(changedValues, allValues);
  }

  function _onReset() {
    form.resetFields();
    if (isFunction(onReset)) onReset();
  }

  return (
    <div>
      <Form
        form={form}
        className="filterformlayout flex"
        name="basic"
        initialValues={initialValues}
        onFinish={_onFinish}
        onValuesChange={_onValuesChange}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        layout={layout}
      >
        <Row gutter={12} className="flex-1">
          {children.map((child, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col key={index} xs={24} md={12} lg={8} xl={6} xxl={4}>
              {child}
            </Col>
          ))}
          <Col xs={24} md={12} lg={8} xl={6} xxl={4}>
            <div className="flex flex-grow mb-4">
              <div>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                {onReset && (
                  <Button onClick={_onReset} className="ml-2">
                    重置
                  </Button>
                )}
              </div>
            </div>
          </Col>
          {onCreate && (
            <Col flex="auto" className="mb-4">
              <div className="flex justify-end">
                <Button type="primary" onClick={onCreate}>
                  新增
                </Button>
              </div>
            </Col>
          )}
        </Row>
      </Form>
    </div>
  );
};

export default FilterFormLayout;
