import React, { FC } from 'react';

interface Props {
  children: number | string;
}

const Price: FC<Props> = ({ children }) => {
  const num = Number(Number(children).toFixed(2).toLocaleString());

  if (Number.isNaN(num)) {
    console.error('Price组件接收值不合法');
    return null;
  }

  return <>¥{num}</>;
};

export default Price;
