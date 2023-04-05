import React, { FC } from 'react';
import './index.scoped.scss';

export type StatusProps = 'success' | 'default' | 'warning' | 'error';

interface Props {
  txt: string;
  status?: StatusProps;
}

const StatusCard: FC<Props> = ({ status = 'default', txt }) => {
  return (
    <div className={`card ${status}`}>
      <i className="circle"></i>
      <span className="txt">{txt}</span>
    </div>
  );
};

export default StatusCard;
