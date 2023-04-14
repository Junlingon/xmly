import React, { FC, createContext } from 'react';

export interface DefaultValue {
  width?: string;
  align?: 'left' | 'center' | 'right';
}

const defaultValue: DefaultValue = { width: '120px', align: 'left' };

export const LabelContext = createContext(defaultValue);

interface Props extends DefaultValue {
  children: any;
}

const LabelGroup: FC<Props> = (props: Props) => {
  const { children, ...otherProps } = props;
  return (
    <LabelContext.Provider value={{ ...defaultValue, ...otherProps }}>
      {children}
    </LabelContext.Provider>
  );
};

export default LabelGroup;
