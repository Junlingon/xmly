import { customCheckEnum } from '../const';

export type CUSTOM_CHECK = 1 | 2; // 1 undefind表示选中  2表示未选中

export interface COL {
  dataIndex: string;
  title: string;
  fixed?: boolean | 'left' | 'right';
  check?: CUSTOM_CHECK | boolean; // 1 undefind表示选中  2表示未选中
}

export type COLUMNS = COL[];

// 将 columns 转化成自定义列表设置数据
function formatColumnsToCustom(columns: COLUMNS): {
  left: COLUMNS;
  center: COLUMNS;
  right: COLUMNS;
} {
  const left: COLUMNS = [];
  const center: COLUMNS = [];
  const right: COLUMNS = [];

  columns.forEach((col: COL) => {
    if (col.fixed === true || col.fixed === 'left') {
      left.push({
        dataIndex: col.dataIndex,
        title: col.title,
        fixed: col.fixed,
        check: col.check !== customCheckEnum[2].value,
      });
    } else if (col.fixed === 'right') {
      right.push({
        dataIndex: col.dataIndex,
        title: col.title,
        fixed: col.fixed,
        check: col.check !== customCheckEnum[2].value,
      });
    } else {
      center.push({
        dataIndex: col.dataIndex,
        title: col.title,
        fixed: col.fixed,
        check: col.check !== customCheckEnum[2].value,
      });
    }
  });

  left.push({
    dataIndex: '0',
    title: '拖拽字段到此',
  });
  center.push({
    dataIndex: '0',
    title: '拖拽字段到此',
  });
  right.push({
    dataIndex: '0',
    title: '拖拽字段到此',
  });

  return {
    left,
    center,
    right,
  };
}

// 将 自定义列表设置数据 转化成 columns
function formatCustomToColumns({
  left,
  center,
  right,
}: {
  left: COLUMNS;
  center: COLUMNS;
  right: COLUMNS;
}) {
  const _left = left.slice(0, left.length - 1).map((col: COL) => {
    col.fixed = true;
    col.check = (
      col.check ? customCheckEnum[1].value : customCheckEnum[2].value
    ) as CUSTOM_CHECK;
    return col;
  });
  const _center = center.slice(0, center.length - 1).map((col: COL) => {
    col.fixed = undefined;
    col.check = (
      col.check ? customCheckEnum[1].value : customCheckEnum[2].value
    ) as CUSTOM_CHECK;
    return col;
  });
  const _right = right.slice(0, right.length - 1).map((col: COL) => {
    col.fixed = 'right';
    col.check = (
      col.check ? customCheckEnum[1].value : customCheckEnum[2].value
    ) as CUSTOM_CHECK;
    return col;
  });

  return [..._left, ..._center, ..._right];
}

export { formatColumnsToCustom, formatCustomToColumns };
