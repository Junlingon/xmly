import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from 'react';
import { Table } from 'antd';
import ResizableTitle from './components/ResizableTitle';
import type { ColumnType } from 'antd/lib/table/interface';
import './index.scss';
import useResizableTableCol from './hooks/useResizableTableCol';
import { useSize } from 'ahooks';
import update from 'immutability-helper';
import DraggableBodyRow from '../DragSortableTable/DraggableBodyRow';
import { _TableLayoutProps } from '../TableLayout/TableLayoutPrivate';
import { debounce, isFunction } from 'lodash-es';
import type {
  TableComponents,
  GetComponentProps,
} from 'rc-table/lib/interface.d';
import { getTableScrollY } from '../TableLayout/utils';

export interface TableProProps extends _TableLayoutProps {
  headerResizeSort?: boolean; // 表头单元格拖拽宽度, 排序
  rowSort?: boolean; // 标体列支持拖拽排序
  ref?: any;
  onColumnsChange?: (cols: any[]) => void;
  components?: TableComponents<any>;
  onRow?: GetComponentProps<any>;
}

interface refProps {}

const TablePro = forwardRef<refProps, TableProProps>(
  (props: TableProProps, ref) => {
    const {
      headerResizeSort,
      rowSort,
      columns,
      data,
      scroll = {},
      onColumnsChange,
      ...otherProps
    } = props;

    const tableRef = useRef<HTMLDivElement>(null);
    const tableWrapperSize = useSize(tableRef);
    const [wrapperWidth, setWrapperWidth] = useState<number>();
    const [_scroll, setScroll] =
      useState<{ x?: number | string | true; y?: number | string }>(scroll);

    const [_data, setData] = useState(data);

    useImperativeHandle(ref, () => ({
      setTableScroll: () => onSetScroll(scroll.x),
    }));

    useEffect(() => {
      window.onresize = debounce(() => {
        onSetScroll(scroll.x);
      }, 300);

      setTimeout(() => {
        onSetScroll(scroll.x);
      }, 100);

      return () => {
        window.onresize = null;
      };
    }, [scroll.x]);

    useEffect(() => {
      setData(data);
    }, [data]);

    const { colIsInit, tableColumns, isChange } = useResizableTableCol(
      wrapperWidth,
      tableRef,
      columns,
      headerResizeSort
    );

    useEffect(() => {
      headerResizeSort &&
        onSetScroll(
          tableColumns.reduce((sum: number, col: any) => sum + col.width, 0)
        );
    }, [tableColumns, headerResizeSort]);

    useEffect(() => {
      if (colIsInit && isChange) {
        if (isFunction(onColumnsChange)) onColumnsChange(tableColumns);
      }
    }, [colIsInit, tableColumns, isChange, onColumnsChange]);

    const colSum = useMemo(() => {
      return columns.reduce(
        (sum: number, col: any) => sum + Number(col.width || 0),
        0
      );
    }, [columns]);

    useEffect(() => {
      if (tableWrapperSize) {
        // 要减去右侧的滚动条和左侧的多选框宽度
        const tableCheckWidth =
          document.querySelector(
            '.table-resizable .ant-table-container table > thead > tr:first-child th:first-child'
          )?.clientWidth || 0;
        const width = tableWrapperSize.width - tableCheckWidth - 15; // 15是滚动条宽度
        setWrapperWidth(Math.max(colSum, width));
      }
    }, [tableRef, tableWrapperSize, colSum]);

    const moveRow = useCallback(
      (dragIndex, hoverIndex) => {
        const dragRow = _data[dragIndex];
        setData(
          update(_data, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragRow],
            ],
          })
        );
      },
      [_data]
    );

    function onSetScroll(x: any) {
      setScroll({
        x,
        y: getTableScrollY(tableRef.current?.offsetTop || 0),
      });
    }

    const tableConfig: any = {
      components: {},
    };

    if (headerResizeSort) {
      tableConfig.components.header = { cell: ResizableTitle };
    }

    if (rowSort) {
      tableConfig.components.body = { row: DraggableBodyRow };
      tableConfig.onRow = (record: any, index: number) => {
        return {
          index,
          moveRow,
        } as any;
      };
    }
    return (
      <div ref={tableRef} className="table-resizable table-layout">
        {colIsInit ? (
          <Table
            columns={tableColumns as ColumnType<any>[]}
            dataSource={_data}
            {...tableConfig}
            {...(otherProps as any)}
            scroll={_scroll}
          />
        ) : null}
      </div>
    );
  }
);

export default TablePro;
