import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { isFunction } from 'lodash';

export type CtrlRef = {
  open?: () => void;
  close?: () => void;
  loading?: () => void;
};

interface Props {
  width?: string | number;
  title: string;
  children: JSX.Element;
  ctrlRef: { current?: CtrlRef };
  footer?: ReactNode;
  markClosable?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  onOpen?: (value?: any) => void;
  bodyStyle?: React.CSSProperties;
}

const XModal: FC<Props> = (props: Props) => {
  const {
    width = 500,
    footer,
    markClosable = true,
    title,
    ctrlRef,
    onOk,
    onCancel,
    children,
    onOpen,
    bodyStyle,
  } = props;

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const _close = useCallback(() => {
    setVisible(false);
    if (isFunction(onCancel)) onCancel();
  }, [onCancel]);

  useEffect(() => {
    if (!ctrlRef.current) {
      ctrlRef.current = {
        open,
        close: _close,
        loading,
      };
    }
  }, [_close, ctrlRef]);

  function open(val?: any) {
    isFunction(onOpen) && onOpen(val);
    setVisible(true);
  }
  function _onOk() {
    if (isFunction(onOk)) onOk();
  }
  function loading(bool: boolean = true) {
    setConfirmLoading(bool);
  }

  return (
    <Modal
      width={width}
      title={title}
      open={visible}
      confirmLoading={confirmLoading}
      footer={footer}
      maskClosable={markClosable}
      onOk={_onOk}
      onCancel={_close}
      destroyOnClose
      bodyStyle={bodyStyle}
    >
      {children}
    </Modal>
  );
};

export default XModal;
