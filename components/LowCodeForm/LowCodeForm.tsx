import { Form, RowProps, FormProps, ColProps } from 'antd';
import { omit } from 'lodash-es';
import React, { useMemo } from 'react';
import FormChild from './FormChild';
import { formChildInterface, methodType, hideKeysType } from './types';
import './index.scss';

interface Props {
  method?: methodType;
  formProps?: FormProps;
  rowProps?: RowProps;
  colProps?: ColProps;
  formItemList?: formChildInterface[];
}

const LowCodeForm = (props: Props) => {
  const { formItemList = [], method = 'create' } = props;

  const [isView] = useMemo(() => {
    return [method === 'view'];
  }, [method]);

  const filterFormItemList = useMemo(() => {
    return formItemList.filter(
      formItem => !formItem[`${method}Hide` as hideKeysType]
    );
  }, [formItemList, method]);

  const childList = filterFormItemList.map((item, index) => {
    const filterItem = omit(item, 'createHide', 'updateHide', 'viewHide');
    return (
      <Form.Item key={index} {...filterItem}>
        <FormChild disabled={isView} {...filterItem} />
      </Form.Item>
    );
  });

  return childList;
};

export default LowCodeForm;
