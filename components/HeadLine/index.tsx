import React, { FC } from 'react';

interface Props {
  title: string;
}

const HeadLine: FC<Props> = (props: Props) => {
  const { title } = props;
  return (
    <div className="flex items-center w-full" style={{ fontSize: 14 }}>
      <div
        className="w-1 h-4 rounded-sm "
        style={{ background: 'var(--color)' }}
      ></div>
      <div className="ml-2">{title}</div>
    </div>
  );
};

export default HeadLine;
