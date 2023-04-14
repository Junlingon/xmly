import { useState, useCallback, ReactNode } from 'react';
import { Modal } from 'antd';
import { isFunction } from 'lodash';

interface Props {
  children?: any;
  title: string | ReactNode;
  onCancel?: () => void;
}

const useXModal = (props: Props) => {
  const { onCancel, title = '', children } = props;
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  function handleOk() {}

  const handleCancel = useCallback(() => {
    setVisible(false);
    if (isFunction(onCancel)) {
      onCancel();
    }
  }, [onCancel]);

  const ModalRender: ReactNode = useCallback(() => {
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    );
  }, [title, visible, confirmLoading, handleCancel, children]);

  return [setVisible, setConfirmLoading, ModalRender];
};

export default useXModal;
