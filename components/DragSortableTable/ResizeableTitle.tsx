import React from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { Resizable } from 'react-resizable';
import { type } from './DraggableBodyRow';

// 表头编辑配置
const ResizeableTitle = (props: any) => {
  const {
    onResize,
    width,
    // handle = () => {},
    index,
    moveCell,
    column,
    ...restProps
  } = props;
  const ref = React.useRef();
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
      moveCell(item.index, index);
    },
  });

  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  } as any);

  drop(drag(ref));
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      {
        // 这里是做的特殊区分，有些表头不能拖拽
        !column.drag_able || column.is_lock ? (
          <th style={{ width }} {...restProps} />
        ) : (
          <th style={{ position: 'relative' }}>
            <span {...restProps}></span>
            <div
              ref={ref}
              {...restProps}
              style={{
                cursor: 'move',
                width: '100%',
                position: 'absolute',
                height: '100%',
                opacity: '0',
                left: 0,
                top: 0,
              }}
            ></div>
          </th>
        )
      }
    </Resizable>
  );
};

export default ResizeableTitle;
