import React from 'react';
import { Popconfirm } from 'antd';
import { isFunction } from 'lodash';

interface PopconfirmProp {
  confirmText: string;
  text: string;
  okText?: string;
  cancelText?: string;
  onClick: () => void;
}

type ComponentWithConfigProp = Record<string, any>;

const componentWithConfig: ComponentWithConfigProp = {
  text: (props: { text: string; onClick: () => void }) => {
    const { text, onClick } = props;

    return <span onClick={onClick}>{text}</span>;
  },
  confirm: (props: PopconfirmProp) => {
    const {
      confirmText,
      okText = '确认',
      cancelText = '取消',
      text,
      onClick,
    } = props;

    function _onDelete() {
      if (isFunction(onClick)) onClick();
    }

    return (
      <Popconfirm
        title={confirmText}
        okText={okText}
        cancelText={cancelText}
        onConfirm={_onDelete}
      >
        <span>{text}</span>
      </Popconfirm>
    );
  },
};

export default componentWithConfig;
