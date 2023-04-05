import { Empty, Pagination, Spin } from 'antd';
import { isFunction } from 'lodash-es';
import React, { FC, useLayoutEffect, useRef, useState } from 'react';
import { defaultPagination } from '../TableLayout/TableLayoutPrivate';
import { getTableScrollY } from '../TableLayout/utils';
import './index.scoped.scss';

interface Props {
  rowKey: string;
  columns: any[];
  onChange: (pagi: any) => void;
  data: any[];
  loading: boolean;
  pagination: any;
  bodyHeader: (col: any) => React.ReactElement;
  secondListKey?: string; // 是否有二级列表展示
}

const CustomTableDetail: FC<Props> = ({
  rowKey,
  columns,
  bodyHeader: BodyHeader,
  data,
  secondListKey,
  pagination,
  loading,
  onChange,
}) => {
  const customTableDetailRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tableBodyRef = useRef<HTMLDivElement>(null);
  const [formatColumns, setFormatColumns] = useState(columns);
  const [_scroll, setScroll] = useState<{
    x?: number | string | true;
    y?: number | string;
  }>({});
  const [hasScroll, setHasScroll] = useState(false); // 是否有滚动条

  useLayoutEffect(() => {
    changeColumnsWidth();
    window.addEventListener('resize', changeColumnsWidth);

    return () => {
      window.removeEventListener('resize', changeColumnsWidth);
    };
  }, [columns]);

  useLayoutEffect(() => {
    tableBodyRef.current?.addEventListener('scroll', getBodyScroll);

    return () => {
      window.removeEventListener('scroll', getBodyScroll);
    };
  }, []);

  function getBodyScroll() {
    const scrollTop = tableBodyRef.current?.scrollLeft || 0;
    headerRef.current?.scrollTo(scrollTop, 0);
  }

  function changeColumnsWidth() {
    const fullWidth = customTableDetailRef.current?.clientWidth || 0;
    const widthTotal = columns.reduce(
      (total, col) => total + (col.width || 0),
      0
    );
    // 这里肯定是不带滚动条的
    if (widthTotal < fullWidth) {
      setHasScroll(false);
      const diffWidth = fullWidth - widthTotal;
      const divideWidth = (diffWidth / columns.length).toFixed(2);
      setFormatColumns(() => {
        return columns.map((v, index) => {
          return {
            ...v,
            width: Number(v.width) + Number(divideWidth), // 表头单元格宽度
            bodyWidth:
              Number(v.width) +
              Number(divideWidth) +
              (index === columns.length - 1 ? -15 : 0), // 表体单元格宽度
            // 减去15 是因为 这里肯定是有滚动条的 滚动条的宽度会让表头表体错位, 所以需要对最后一列做宽度减15
          };
        });
      });
    } else if (widthTotal > fullWidth) {
      setHasScroll(true);
      setFormatColumns(() => {
        return columns.map((v, index) => {
          return {
            ...v,
            bodyWidth:
              Number(v.width) + (index === columns.length - 1 ? -15 : 0), // 表体单元格宽度
            // 减去15 是因为 这里肯定是有滚动条的 滚动条的宽度会让表头表体错位, 所以需要对最后一列做宽度减15
          };
        });
      });
    }

    setTimeout(() => {
      onSetScroll();
    }, 100);
  }

  function onSetScroll(x?: any) {
    setScroll({
      x,
      y: getTableScrollY(tableRef.current?.offsetTop || 0) - 8, // 自定义表格表头下面间距8px
    });
  }

  function _onChange(page: number, pageSize: number) {
    isFunction(onChange) && onChange({ current: page, pageSize });
  }

  return (
    <div className="custom-table" ref={tableRef}>
      <div className="customTableDetail" ref={customTableDetailRef}>
        <div className="header" ref={headerRef}>
          <div className="header-content">
            {formatColumns.map(col => {
              return (
                <div
                  key={col.dataIndex}
                  className={`header-cell ${col.fixed ? 'fixed' : ''}`}
                  style={{
                    width: `${col.width}px`,
                    position: col.fixed ? 'sticky' : 'relative',
                    right: 0,
                  }}
                >
                  {col.title}
                </div>
              );
            })}
          </div>
        </div>
        <Spin tip="Loading..." spinning={loading}>
          <div
            className="table-body"
            style={{ maxHeight: _scroll.y }}
            ref={tableBodyRef}
          >
            {data.map((item: any) => {
              return (
                <div className="table-body-row" key={item[rowKey]}>
                  <div className="table-body-row-header">
                    <BodyHeader col={item} hasScroll={hasScroll} />
                  </div>
                  {secondListKey ? (
                    <div className="table-body-row-list">
                      {Array.isArray(item[secondListKey]) &&
                        item[secondListKey].map(
                          (detail: any, index: number) => (
                            <div
                              key={index}
                              className="table-body-row-list-col"
                            >
                              {formatColumns.map(col2 => {
                                return (
                                  <div
                                    key={col2.dataIndex}
                                    className={`table-body-row-list-col-cell ${
                                      col2.fixed ? 'fixed' : ''
                                    }`}
                                    style={{
                                      width: `${col2.bodyWidth}px`,
                                      position: col2.fixed
                                        ? 'sticky'
                                        : 'relative',
                                      right: 0,
                                    }}
                                  >
                                    {isFunction(col2.render)
                                      ? col2.render(
                                          detail[col2.dataIndex],
                                          detail
                                        )
                                      : typeof detail[col2.dataIndex] ===
                                          'string' ||
                                        typeof detail[col2.dataIndex] ===
                                          'number'
                                      ? detail[col2.dataIndex]
                                      : null}
                                    {}
                                  </div>
                                );
                              })}
                            </div>
                          )
                        )}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Spin>
        {!data?.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </div>
      <div className="pagination flex justify-end mt-4">
        <Pagination
          size="small"
          {...defaultPagination}
          {...pagination}
          onChange={_onChange}
        />
      </div>
    </div>
  );
};

export default CustomTableDetail;
