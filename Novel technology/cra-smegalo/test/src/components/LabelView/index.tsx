import React, { FC, useContext } from 'react';
import './index.scoped.scss';
import { LabelContext, DefaultValue } from './LabelGroup';

interface Props extends DefaultValue {
  label: string;
  children?: any;
}

const LabelView: FC<Props> = (props: Props) => {
  const { label, children, ...otherProps } = props;

  const labelContext = useContext(LabelContext);
  const { width, align } = { ...labelContext, ...otherProps };

  return (
    <div className="labelView flex mb-4">
      <span style={{ width, textAlign: align }} className="mr-3">
        {label} :
      </span>
      <span>{children}</span>
    </div>
  );
};

export default LabelView;
