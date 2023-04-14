import React, { FC } from 'react';

interface Props {}

const ItemsAudit: FC<Props> = (props: Props) => {
  console.log(props);
  return <div>物料审核管理</div>;
};

export default ItemsAudit;
