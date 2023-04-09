import { useSafeState } from 'ahooks';
import type { ColumnType } from 'antd/es/table/interface';
import { useMemo } from 'react';

const useTableCol = (
  columns: ColumnType<any>[],
  wrapperWidth: number,
  scrollX: number
) => {
  const [isInit, setInit] = useSafeState<boolean>(false);

  const maxWidth = useMemo(() => {
    const colSum = columns.reduce(
      (sum, col) => sum + Number(col.width || 0),
      0
    );

    return Math.max(colSum, wrapperWidth || 0, scrollX || 0);
  }, [columns, scrollX, wrapperWidth]);

  console.log('maxWidth', maxWidth);

  const [tableShowColumns, setTableShowColumns] = useSafeState<
    ColumnType<any>[]
  >([]);

  function init() {
    setTableShowColumns(columns);
    setInit(true);
  }

  return {
    tableShowColumns,
    isInit,
    init,
  } as const;
};

export default useTableCol;
