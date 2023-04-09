import { Tooltip } from 'antd';
import React, { FC } from 'react';
import './index.scoped.scss';

interface Props {
  ellipsis?: number;
  children: any;
  width?: number;
  minWidth?: number;
  title?: any;
  className?: string;
  style?: React.CSSProperties;
}

const XToolTip: FC<Props> = (props: Props) => {
  const {
    ellipsis = 1,
    children,
    width,
    title,
    className,
    minWidth,
    style = {},
  } = props;

  function getStyle() {
    const _style: any = {};

    if (ellipsis !== 1) {
      _style.WebkitBoxOrient = 'vertical';
      _style.WebkitLineClamp = ellipsis;
    }

    if (width) _style.width = `${width}px`;
    if (minWidth) _style.minWidth = `${minWidth}px`;

    return { ..._style, ...style };
  }

  return (
    <Tooltip placement="top" title={title || children} className={className}>
      <span
        className={
          ellipsis === 1
            ? 'oneHidden xToolTipView'
            : 'manyLineHidden xToolTipView'
        }
        style={getStyle()}
      >
        {children}
      </span>
    </Tooltip>
  );
};

export default XToolTip;
