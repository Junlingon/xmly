import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Modal, Form, Input, Button, Switch, notification } from 'antd';
import { useCouponContext } from './index.context';
import { createInvoice, updateInvoice } from '@/services/sellerInfo';

interface Props {
  type?: 'create' | 'edit';
}

interface PropsRef {}

const CouponModal = forwardRef<PropsRef, Props>((props, ref) => {
  const {
    modalVisible: visible,
    setModalVisible,
    modalType,
    modalData,
    getList,
  } = useCouponContext();

  const [form] = Form.useForm();
  const isView = modalType === 'view';
  const isEdit = modalType === 'edit';
  const typeTitle =
    modalType === 'create' ? '新增' : modalType === 'edit' ? '编辑' : '查看';
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({}));

  useEffect(() => {
    form.setFieldsValue({
      ...modalData,
      statusId: modalData.statusId === 1,
    });
  }, [form, modalData]);

  function onFinish(values: any) {
    setLoading(true);
    let api = createInvoice;
    isEdit && (api = updateInvoice);
    api({ ...values, ...modalData, statusId: values.statusId ? 1 : 2 })
      .then(() => {
        onCalcel();
        getList();
      })
      .catch(() => {
        notification.error({
          message: `${typeTitle}失败`,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onCalcel() {
    setModalVisible(false);
    form.resetFields();
  }

  return (
    <Modal
      title={typeTitle}
      footer={null}
      visible={visible}
      onCancel={onCalcel}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="horizontal"
        labelCol={{ flex: '0 0 110px' }}
      >
        <Form.Item
          label="商品发票编码"
          name="commodityCoding"
          rules={[
            {
              required: true,
              message: '请输入商品发票编码',
            },
          ]}
        >
          <Input disabled={isView} />
        </Form.Item>
        <Form.Item
          label="开票类型"
          name="invoiceContent"
          rules={[
            {
              required: true,
              message: '请输入开票类型',
            },
          ]}
        >
          <Input disabled={isView} />
        </Form.Item>
        <Form.Item
          label="商品分类"
          name="goodsCategory"
          rules={[
            {
              required: true,
              message: '请输入商品分类',
            },
          ]}
        >
          <Input disabled={isView} />
        </Form.Item>
        <Form.Item
          label="税率"
          name="taxRate"
          rules={[
            {
              required: true,
              message: '请输入税率',
            },
          ]}
        >
          <Input disabled={isView} />
        </Form.Item>
        <Form.Item
          label="状态"
          name="statusId"
          rules={[
            {
              required: true,
              message: '请切换状态',
            },
          ]}
          valuePropName="checked"
          initialValue={true}
        >
          <Switch
            disabled={isView}
            checkedChildren="启用"
            unCheckedChildren="停用"
          />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            disabled={isView}
          />
        </Form.Item>
        <div className="flex justify-end">
          <Button onClick={onCalcel}>取消</Button>
          {!isView && (
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="ml-3"
            >
              确认
            </Button>
          )}
        </div>
      </Form>
    </Modal>
  );
});

export default CouponModal;
