import React, { FC } from 'react';

interface Props {}

const VendorManage: FC<Props> = (props: Props) => {
  console.log(props);
  return <div>供应商管理</div>;
};

export default VendorManage;
