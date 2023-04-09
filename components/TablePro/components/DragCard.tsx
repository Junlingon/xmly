import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { HolderOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import './style/FragCard.scoped.scss';

export type DragType = 'left' | 'center' | 'footer';

interface Props {
  type: DragType;
  col: any;
  index: number;
  moveCard: (
    dragIndex: number,
    hoverIndex: number,
    from: DragType,
    to: DragType
  ) => void;
  hover: any;
  setHover: (val: any) => void;
  onCheckChange: (val: boolean, type: DragType, index: number) => void;
  style?: any;
}

function DragCard(props: Props) {
  const { style, col, index, moveCard, type, hover, setHover, onCheckChange } =
    props;
  const ref = useRef<HTMLDivElement>(null);
  const noDrag = col.dataIndex === '0';
  const { disabled } = col;

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: () => ({ index, col, type }),
      collect: (monitor: any) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
      canDrag: () => {
        return !disabled && col.dataIndex !== '0';
      },
      end: () => {
        setHover({});
      },
    }),
    [index, type, col]
  );

  const [{ handlerId }, drop] = useDrop(
    {
      accept: ItemTypes.CARD,
      collect(monitor: any) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      drop: (item: any) => {
        setHover({});
        if (item.type === type && item.index === index) return;
        moveCard(item.index, index, item.type, type);
        item.index = index;
      },
      hover: () => {
        if (noDrag) return;
        setHover(col);
      },
      canDrop: (item: any) => {
        return !disabled && (item.type !== type || col.dataIndex !== '0');
      },
    },
    [index, type]
  );

  function _onCheckChange(e: any) {
    onCheckChange(e.target.checked, type, index);
  }

  drop(drag(ref));

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className="flex items-center justify-between"
      style={{
        ...style,
        width: '200px',
        opacity,
        border: `1px ${noDrag ? 'dashed' : ''} ${
          col.dataIndex === hover.dataIndex ? 'var(--color)' : '#ccc'
        }`,
        borderRadius: 4,
        padding: '6px 12px',
        marginBottom: 10,
        backgroundColor: '#fff',
        cursor: !col.disabled ? (noDrag ? 'auto' : 'move') : 'auto',
        boxSizing: 'border-box',
      }}
    >
      {noDrag ? (
        col.title
      ) : (
        <>
          <div
            className="flex items-center overflow-hidden"
            style={{ flex: '1 1 100%' }}
            title={col.title}
          >
            <HolderOutlined />
            <Checkbox
              checked={col.check}
              disabled={col.disabled}
              style={{ margin: '0 8px' }}
              onChange={_onCheckChange}
            />
            <span className="truncate ...">{col.title}</span>
          </div>
          {!col.disabled && <div className="index-card">{index + 1}</div>}
        </>
      )}
    </div>
  );
}

export default DragCard;
