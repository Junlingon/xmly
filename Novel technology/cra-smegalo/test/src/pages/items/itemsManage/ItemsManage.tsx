import React, { FC } from 'react';

interface Props {}

const ItemsManage: FC<Props> = (props: Props) => {
  console.log(props);
  return <div>物料管理</div>;
};

export default ItemsManage;
