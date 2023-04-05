import { Table } from 'antd';
import React, { FC, useCallback, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import ResizeableTitle from './ResizeableTitle';
import DraggableBodyRow from './DraggableBodyRow';
import update from 'immutability-helper';
import './index.scoped.scss';

interface Props {}

const DragSortableTable: FC<Props> = () => {
  const [data, setData] = useState([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ]);

  const [columns, setColumns] = useState([
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      drag_able: true,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 300,
      drag_able: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 300,
      drag_able: true,
    },
  ]);

  function handleResize(index: number) {
    return () => {
      console.log(index);
    };
  }

  function moveCell(dragIndex: number, hoverIndex: number) {
    const _columns = columns;
    const dragCell = _columns[dragIndex];
    const newColumns = update(columns, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCell],
      ],
    });

    setColumns(newColumns);
  }

  function formatRows(columns: any) {
    return columns.map((col: any, index: number) => {
      col.index = index;
      col.onHeaderCell = (column: any) => ({
        width: col.width,
        onResize: handleResize(index), // 表头可伸缩函数
        index,
        moveCell, // 拖拽函数
        column, // 表头数据
      });
      return col;
    });
  }

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
    },
    [data]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="table-resizable">
        <Table
          components={{
            header: {
              cell: ResizeableTitle,
            },
            body: {
              row: DraggableBodyRow,
            },
          }}
          onRow={(record, index) => {
            return {
              index,
              moveRow,
            } as any;
          }}
          bordered
          dataSource={data}
          columns={formatRows(columns)}
        />
      </div>
    </DndProvider>
  );
};

export default DragSortableTable;
