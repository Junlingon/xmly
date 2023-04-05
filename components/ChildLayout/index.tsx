import { PageHeader } from 'antd';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { isFunction } from 'lodash-es';

interface Props {
  title?: string;
  back?: () => void;
  children?: any;
}

const ChildLayout: FC<Props> = (props: Props) => {
  const { title, back, children } = props;
  const history = useHistory();

  return (
    <>
      {title && (
        <PageHeader
          className="site-page-header"
          onBack={() => {
            if (back && isFunction(back)) back();
            else history.goBack();
          }}
          title={title}
          style={{ paddingTop: 0 }}
        />
      )}
      <div className="px-6 pb-6">{children}</div>
    </>
  );
};

export default ChildLayout;
