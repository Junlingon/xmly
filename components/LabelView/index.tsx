import { Col } from 'antd';
import React, { FC, useContext } from 'react';
import './index.scoped.scss';
import { LabelContext, DefaultValue } from './LabelGroup';

interface Props extends DefaultValue {
  label: string;
  children?: any;
  span?: number;
}

const LabelView: FC<Props> = (props: Props) => {
  const { label, children, span = 8, ...otherProps } = props;

  const labelContext = useContext(LabelContext);
  const { width, align } = { ...labelContext, ...otherProps };

  return (
    <Col span={span}>
      <div className="labelView flex mb-4">
        <span style={{ width, textAlign: align }} className="mr-3">
          {label} :
        </span>
        <span>{children}</span>
      </div>
    </Col>
  );
};

export default LabelView;
