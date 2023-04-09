import React, { useMemo, useState, useRef } from 'react';
import type { ResizeCallbackData } from 'react-resizable';
import { Resizable } from 'react-resizable';
import { useDrop, useDrag } from 'react-dnd';
import { isFunction } from 'lodash-es';
import { tableCellMinWidth } from '../config';

export const type = 'DraggableBodyRow';

export type ResizeStatusType = 'done' | 'pending';

const ResizableTitle: React.FC<any> = props => {
  const {
    width,
    className,
    children,
    onResize,
    style = {},
    index,
    moveCell,
    fixed,
    ...resetProps
  } = props;
  const ref = useRef();
  const resizeStatusRef = useRef<ResizeStatusType>('done');
  const [, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: any) => {
      isFunction(moveCell) && moveCell(item.index, index);
    },
  });

  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  } as any);

  // 1.定位列不允许排序 2.拖拽宽度不允许排序
  !fixed && resizeStatusRef.current === 'done' && drop(drag(ref));

  const [offset, setOffset] = useState<number>(0);
  const [nextWidth, setNextWidth] = useState<number>(58);

  const getTranslateX = useMemo(() => {
    if (offset >= nextWidth + tableCellMinWidth) {
      return nextWidth - tableCellMinWidth;
    }
    return offset;
  }, [offset, nextWidth]);

  if (className?.includes('ant-table-selection-column')) {
    return (
      <th className={className} {...resetProps} style={style}>
        {children}
      </th>
    );
  }

  if (onResize && moveCell && !fixed) {
    return (
      <Resizable
        width={width + offset}
        height={0}
        handle={
          <span
            className={`react-resizable-handle ${offset ? 'active' : ''}`}
            style={{ transform: `translateX(${getTranslateX}px)` }}
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
            }}
          />
        }
        onResizeStart={(e: any) => {
          resizeStatusRef.current = 'pending';
          let _nextWidth =
            e.target.parentNode.nextSibling.getBoundingClientRect().width;
          const _nextClassList = [...e.target.parentNode.nextSibling.classList];
          // 如果下一个是滚动条, 就设置最大拖拽距离300px
          if (_nextClassList.includes('ant-table-cell-scrollbar')) {
            _nextWidth = 300;
          }
          setNextWidth(_nextWidth);
        }}
        onResizeStop={(...arg: any[]) => {
          setOffset(0);
          onResize(...arg);
          resizeStatusRef.current = 'done';
        }}
        onResize={(e: any, { size }: ResizeCallbackData) => {
          const currentOffset = size.width - width; // 移动的距离
          if (currentOffset > nextWidth - tableCellMinWidth) {
            // 往右移动到下一个列宽度tableCellMinWidth 停止 设置往右最大移动的距离值
            setOffset(nextWidth - tableCellMinWidth);
          } else {
            setOffset(currentOffset);
          }
        }}
        draggableOpts={{
          enableUserSelectHack: true,
        }}
        minConstraints={[tableCellMinWidth, 0]} // 宽高最小值
        maxConstraints={[width + nextWidth - tableCellMinWidth, 0]} // 宽高最大值
      >
        <th
          className={className}
          style={{ ...style, position: 'relative' }}
          {...resetProps}
        >
          <div
            ref={ref as any}
            style={{
              position: 'absolute',
              height: '100%',
              left: 0,
              top: 0,
              padding: 12,
            }}
            className="ofs-table-cell-wrapper"
            title={
              typeof children.join('') === 'string' ? children.join('') : ''
            }
          >
            <div className="ofs-table-cell">{children}</div>
          </div>
        </th>
      </Resizable>
    );
  }

  return (
    <th
      className={className}
      style={{ ...style, width: `${width}px` }}
      {...resetProps}
    >
      <div
        style={{ width: `${width - 20}px` }}
        className="ofs-table-cell"
        title={typeof children.join('') === 'string' ? children.join('') : ''}
      >
        <div {...resetProps} className="ofs-table-cell">
          {children}
        </div>
      </div>
    </th>
  );
};

export default ResizableTitle;
