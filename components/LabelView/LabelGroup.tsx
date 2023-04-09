import { Row } from 'antd';
import React, { FC, createContext } from 'react';

export interface DefaultValue {
  width?: string;
  align?: 'left' | 'center' | 'right';
}

const defaultValue: DefaultValue = { width: '120px', align: 'left' };

export const LabelContext = createContext(defaultValue);

interface Props extends DefaultValue {
  children: any;
  gutter?: [number, number];
}

const LabelGroup: FC<Props> = (props: Props) => {
  const { children, gutter = [8, 24], ...otherProps } = props;
  return (
    <LabelContext.Provider value={{ ...defaultValue, ...otherProps }}>
      <Row gutter={gutter}>{children}</Row>
    </LabelContext.Provider>
  );
};

export default LabelGroup;
