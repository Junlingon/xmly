import { useMemoizedFn, useSafeState } from 'ahooks';
import type { ColumnType } from 'antd/lib/table';
import { useState, useEffect, useRef } from 'react';
import useTableCol from './useTableCol2';
import update from 'immutability-helper';
import { tableCellMinWidth } from '../config';

const useResizableTableCol = (
  wrapperWidth: number | undefined,
  tableRef: any,
  columns: ColumnType<any>[],
  headerResizeSort?: boolean
) => {
  const [colIsInit, setColInit] = useSafeState<boolean>(false);
  const [tableColumns, setTableColumns] = useState<ColumnType<any>[]>(columns);
  const { tableShowColumns, isInit, init } = useTableCol(wrapperWidth, columns);
  const isChangeRef = useRef(false); // 控制初始化状态, 必须触发拖拽和排序才会变为true

  useEffect(() => {
    // 过滤未选中展示的列
    setTableColumns(columns);
    init();
  }, [columns]);

  const handleResize = useMemoizedFn(
    (index: number) =>
      (e: any, { size }: any) => {
        e.stopImmediatePropagation();
        if (tableRef.current) {
          isChangeRef.current = true;

          const widthList = [
            ...((tableRef.current as HTMLElement).querySelectorAll(
              '.ant-table-thead th.react-resizable'
            ) as any),
          ].map(th => {
            return (th as HTMLElement).getBoundingClientRect().width;
          });
          setTableColumns((col: any) => {
            const nextColumns = [...col];
            const newCols = nextColumns[index];
            const { width: oldWidth } = newCols;
            // 此次平移的宽度
            const offsetWidth = size.width - Number(oldWidth || 0);
            // 当前列的宽度
            const currentWidth = widthList[index] + offsetWidth;

            if (currentWidth < tableCellMinWidth) {
              widthList[index] = tableCellMinWidth;
            } else {
              widthList[index] = currentWidth;
            }
            const resultColumns = nextColumns;
            resultColumns[index] = {
              ...newCols,
              width: widthList[index],
              onHeaderCell: () =>
                ({
                  ...(newCols.onHeaderCell ? newCols.onHeaderCell() : {}),
                  width: widthList[index], // 定位的不动宽度
                  onResize: handleResize(index),
                  index,
                  fixed: newCols.fixed,
                } as any),
            };

            return resultColumns;
          });
        }
      }
  );

  const moveCell = useMemoizedFn((dragIndex: number, hoverIndex: number) => {
    const _columns = tableColumns;
    const dragCell = _columns[dragIndex];
    const newColumns = update(tableColumns, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCell],
      ],
    });
    isChangeRef.current = true;
    setTableColumns(
      newColumns.map((col, index) => {
        let _moveCell: any;
        if (!col.fixed) {
          _moveCell = moveCell;
        }
        return {
          ...col,
          onHeaderCell: () =>
            ({
              width: col.width,
              onResize: handleResize(index),
              moveCell: _moveCell,
              index,
              fixed: col.fixed,
            } as any),
        };
      })
    );
  });

  useEffect(() => {
    if (isInit && headerResizeSort) {
      setTableColumns(
        tableShowColumns.map((col, index) => {
          let _moveCell: any;
          if (!col.fixed) {
            _moveCell = moveCell;
          }
          return {
            ...col,
            onHeaderCell: () =>
              ({
                width: col.width,
                onResize: handleResize(index),
                moveCell: _moveCell,
                index,
                fixed: col.fixed,
              } as any),
          };
        })
      );
      setColInit(true);
    } else if (isInit) {
      setColInit(true);
    }
  }, [
    headerResizeSort,
    tableShowColumns,
    isInit,
    setTableColumns,
    handleResize,
    setColInit,
    moveCell,
  ]);

  return {
    colIsInit,
    tableColumns,
    isChange: isChangeRef.current,
  } as const;
};

export default useResizableTableCol;
