import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from 'react';
import { Table } from 'antd';
import { TableRowSelection } from 'antd/lib/table/interface';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { debounce } from 'lodash-es';
import { getTableScrollY } from './utils';

export interface _TableLayoutProps {
  columns: any;
  data: any[];
  pagination?:
    | { current?: number; total: number; pageNum: number; simple?: boolean }
    | boolean;
  onChange?: (pagination: any, filters: any, sorter: any, extra: any) => void;
  loading?: boolean;
  rowKey?: string;
  scroll?: { x?: string | number | true; y?: number | string };
  rowSelection?: TableRowSelection<any>;
  size?: SizeType;
}

interface refProps {}

export const defaultPagination = {
  hideOnSinglePage: false,
  showTotal: (total: number) => `共 ${total} 条`,
  showSizeChanger: true,
};

const TableLayoutPrivate = forwardRef<refProps, _TableLayoutProps>(
  (props, ref) => {
    const {
      columns,
      data,
      pagination,
      onChange,
      loading,
      rowKey = 'id',
      scroll = {},
      rowSelection,
      size = 'small',
      ...otherProps
    } = props;
    const tableLayputPrivateRef = useRef<HTMLDivElement>(null);
    const [_scroll, setScroll] =
      useState<{ x?: number | string | true; y?: number | string }>(scroll);

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

    function onSetScroll(x: any) {
      setScroll({
        x,
        y:
          scroll.y ||
          getTableScrollY(tableLayputPrivateRef.current?.offsetTop || 0),
      });
    }
    return (
      <div className="table-layout" ref={tableLayputPrivateRef}>
        <Table
          {...otherProps}
          size={size}
          columns={columns}
          dataSource={data}
          pagination={
            typeof pagination === 'object'
              ? {
                  ...defaultPagination,
                  ...pagination,
                  current: pagination.pageNum,
                }
              : false
          }
          rowKey={rowKey}
          onChange={onChange}
          loading={loading}
          scroll={_scroll}
          rowSelection={rowSelection}
        />
      </div>
    );
  }
);

export default TableLayoutPrivate;
