import useTableColumnsCache from '@/hooks/useTableColumnsCache';
import { inject, observer } from 'mobx-react';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import TablePro, { TableProProps } from '../TablePro';
import CustomColumns from '../TablePro/components/CustomColumns';
import { COLUMNS } from '../TablePro/components/utils';
import {
  mergeCusmtomToColumns as mergeCustomToColumns,
  getAllCols,
} from '../TablePro/utils';
import TableLayoutPrivate from './TableLayoutPrivate';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { customCheckEnum } from '../TablePro/components/const';
import './index.scoped.scss';
import { isEqual } from 'lodash';
import { getSorter } from './utils';
import { isFunction } from 'lodash-es';
import { useLocation } from 'react-router-dom';
import { formatWidth } from './table.untils';

function filterCheckCol(cols: any[]) {
  return cols.filter((col: any) => col.check !== customCheckEnum[2].value);
}

export interface TableLayoutProps extends TableProProps {
  cardContainer?: any; // mobx-state-tree数据
  canCustom?: boolean; // 是否可以自定义列表设置
  className?: string;
}

const TableLayout: FC<TableLayoutProps> = (props: TableLayoutProps) => {
  const {
    headerResizeSort,
    rowSort,
    cardContainer,
    columns,
    canCustom,
    onChange,
    rowSelection,
    ...otherProps
  } = props;
  const [formatColumns, setFormatColumns] = useState<any[]>(
    formatWidth(columns)
  );

  const location = useLocation();
  // 解决组件销毁的时候执行setColumnsStorage但是pathaname已经不是当期页面的pathname, 造成缓存数据错误问题
  const locationPathNameRef = useRef(location.pathname);

  const [, setColumnsStorage, getColumnsStorage] = useTableColumnsCache(
    {
      columns,
    },
    []
  );

  useEffect(() => {
    // 获取最新的值
    const newColumnsStorage = getColumnsStorage();
    if (Array.isArray(newColumnsStorage) && canCustom) {
      const columnsStorageCopy = filterCheckCol(newColumnsStorage);
      columnsStorageCopy.forEach((col: any, index: number) => {
        const cur = columns.find(
          (v: any) => v.dataIndex === col.dataIndex && v.title === col.title
        );
        if (cur) {
          columnsStorageCopy[index] = {
            ...cur,
            ...col,
            sorter: getSorter(cur), // 处理sorter
            dataIndex: col.dataIndex,
            width: col.width,
          };
        }
      });
      setFormatColumns(columnsStorageCopy);
    } else {
      columns.forEach((col: any) => {
        col.sorter = getSorter(col);
      });
      setFormatColumns(formatWidth(columns));
    }
  }, [columns, canCustom, getColumnsStorage]);

  // 自定义列表设置保存触发
  const onOkCustomColumns = useCallback(
    (cols: COLUMNS) => {
      const filterCols = mergeCustomToColumns(formatColumns, cols);
      setFormatColumns(filterCheckCol(filterCols));
      setColumnsStorage(filterCols);
    },
    [formatColumns, setColumnsStorage]
  );

  // 表头拖拽排序和宽度变化触发
  const onColumnsChange = useCallback(
    (cols: any[]) => {
      const filterCols = getAllCols(getColumnsStorage() || formatColumns, cols);

      const colsStorage = filterCols.map((col: any) => ({
        dataIndex: col.dataIndex,
        width: col.width,
        fixed: col.fixed,
        check: col.check,
        title: col.title,
      }));
      if (
        !isEqual(colsStorage, getColumnsStorage()) &&
        isEqual(locationPathNameRef.current, location.pathname)
      ) {
        setColumnsStorage(colsStorage);
      }
    },
    [getColumnsStorage, formatColumns, location.pathname, setColumnsStorage]
  );

  // 自定义列表设置
  const CustomCols = useCallback(() => {
    return canCustom ? (
      <div className="table-layout-main-line">
        <CustomColumns
          columns={getColumnsStorage()} // 防止死循环 单独获取
          className="custom-columns"
          onOk={onOkCustomColumns}
        />
      </div>
    ) : null;
  }, [canCustom, getColumnsStorage, onOkCustomColumns]);

  function _onChange(pagination: any, filters: any, sorter: any, extra: any) {
    if (extra.action === 'paginate') {
      isFunction(onChange) && onChange(pagination, filters, sorter, extra);
    }
  }

  if (headerResizeSort || rowSort) {
    return (
      <DndProvider backend={HTML5Backend}>
        <CustomCols />
        <TablePro
          ref={cardContainer.tableLayoutRef}
          {...props}
          rowSelection={
            rowSelection ? { fixed: true, ...rowSelection } : undefined
          }
          columns={formatColumns}
          onColumnsChange={onColumnsChange}
          onChange={_onChange}
          size="small"
        />
      </DndProvider>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomCols />
      <TableLayoutPrivate
        ref={cardContainer.tableLayoutRef}
        columns={formatColumns}
        {...otherProps}
        rowSelection={
          rowSelection ? { fixed: true, ...rowSelection } : undefined
        }
        onChange={_onChange}
        size="small"
      />
    </DndProvider>
  );
};

export default inject('cardContainer')(observer(TableLayout));
