import { customCheckEnum } from './components/const';
import { COLUMNS, COL } from './components/utils';

function filterColumns(columns: any[]) {
  return columns.filter((column: any) => !column.fixed);
}

// 将自定义列表设置转化成表格columns
function mergeCusmtomToColumns(columns: any[], customCulumns: COLUMNS): any[] {
  customCulumns.forEach((custom: COL, index: number) => {
    const item = columns.find(
      col => col.dataIndex === custom.dataIndex && col.title === custom.title
    );
    if (item) {
      customCulumns[index] = { ...item, ...custom };
    }
  });

  return customCulumns;
}

// 拖拽的表格数据可能丢失因为有些数据是被过滤隐藏了, 需要从元数据找出放置进去
function getAllCols(columns: any[], showCols: any[]): any[] {
  const dataIndexList = showCols.map((col: any) => col.dataIndex);
  const hideCols = columns.filter(
    (col: any) => !dataIndexList.includes(col.dataIndex)
  );

  hideCols.map((col: any) => {
    col.check = customCheckEnum[2].value;
  });

  const filterCols = mergeCusmtomToColumns(columns, showCols);

  return [...filterCols, ...hideCols];
}

export { filterColumns, mergeCusmtomToColumns, getAllCols };
