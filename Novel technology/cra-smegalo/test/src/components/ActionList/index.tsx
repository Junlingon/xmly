import React, { FC, ReactNode } from 'react';
import componentWithConfig from './componentWithConfig';
import './index.scoped.scss';

interface Columns {
  text: string;
  type: 'text' | 'confirm';
  onClick: () => void;
  confirmText?: string | ReactNode;
}

interface Props {
  columns: Columns[];
}

const ActionList: FC<Props> = (props: Props) => {
  const { columns } = props;

  return (
    <div className="actionlist">
      {columns.map(column => {
        const Component = componentWithConfig[column.type];

        return <Component key={column.text} {...column} />;
      })}
    </div>
  );
};

export default ActionList;
