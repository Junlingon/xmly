// 排序数字
export const sortNumber = (a: number | string, b: number | string) => {
  return Number(a) - Number(b);
};

// 排序字符串
export const sortString = (a: number | string, b: number | string) => {
  return String(a) < String(b);
};

export const getSorter = (col: any) => {
  switch (col.sorter) {
    case 'sortNumber':
      return (a: any, b: any) => sortNumber(a[col.dataIndex], b[col.dataIndex]);
    case 'sortString':
      return (a: any, b: any) => sortString(a[col.dataIndex], b[col.dataIndex]);

    default:
      return col.sorter;
  }
};

// 获取表格 Y轴滚动条
export const getTableScrollY = (tableHeaderOffsetTop: number) => {
  return (
    document.body.clientHeight -
    ((tableHeaderOffsetTop || 0) +
      44 + // 表头
      16 + // 分页器距离表格距离
      24 + // 分页器高度
      16) // 距离白色底部的距离
  );
};
