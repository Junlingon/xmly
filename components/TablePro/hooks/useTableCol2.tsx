import { useMemoizedFn, useSafeState } from 'ahooks';
import type { ColumnType } from 'antd/es/table/interface';
import { cloneDeep } from 'lodash-es';
import { useEffect } from 'react';

const useTableCol = (
  wrapperWidth: number | undefined,
  columns: ColumnType<any>[]
) => {
  const [isInit, setInit] = useSafeState<boolean>(false);

  // 每一列的宽度转换成数字之后的列配置
  const [tableShowColumns, setTableShowColumns] = useSafeState<
    ColumnType<any>[]
  >([]);

  // 初始时，将传入的表格配置数据进行转换
  // 将百分比、字符串格式的宽度配置转换成对应的数字宽度
  // 并根据容器的宽度做自适应
  const getTableNumberWidthCol = useMemoizedFn(() => {
    let resultTableColumnList: ColumnType<any>[] = [];
    if (wrapperWidth && columns) {
      // TODO: 筛选出所有显示的列
      const showCols = columns.filter(col => col);
      const newColumnList = showCols.map(col => {
        const { width } = col;
        const newCol = { ...col };
        // 当配置了width属性，且width为字符串类型时，计算具体的宽度值
        if (width && typeof width === 'string') {
          newCol.width = width.endsWith('%')
            ? (wrapperWidth * parseFloat(width)) / 100
            : parseFloat(width);
        }
        return newCol;
      });
      // 表格总的宽度
      const totalWidth = newColumnList
        .filter(item => typeof item.width === 'number')
        .reduce((sum, current) => sum + Number(current.width), 0);
      // 查找出未配置宽度的列
      const noWidthColumn = newColumnList.filter(col => !col.width);
      // 如果存在未配置宽度的列，则将容器未分配的宽度，等分给未分配宽度的列
      if (noWidthColumn.length > 0) {
        const otherWidth = wrapperWidth - totalWidth;
        if (otherWidth > 0) {
          // 为了简单，向下取整，并将差值放到最后一列
          const commonWidth = Math.floor(otherWidth / noWidthColumn.length);
          const resultColumn = newColumnList.map(col => {
            if (!col.width) {
              // 最后一个未配置宽度的列宽取差值
              if (col.title === noWidthColumn[noWidthColumn.length - 1].title) {
                col.width =
                  otherWidth - commonWidth * (noWidthColumn.length - 1);
              } else {
                // 非最后一个未配置宽度的列，则取均值的向下取整值
                col.width = commonWidth;
              }
            }
            return col;
          });
          resultTableColumnList = resultColumn;
        } else {
          // 存在未分配宽度的列，但是列的已分配宽度大于容器宽度，此处正常情况下不应出现
          // 若出现了此情况，则给无列宽的列都分配60px的宽度，其他有列宽的需要同等缩小
          const needWidth = 60 * noWidthColumn.length + Math.abs(otherWidth);
          const showColWithWidth = newColumnList.length - noWidthColumn.length;
          if (showColWithWidth > 0) {
            const averageWidth = Math.floor(needWidth / showColWithWidth);
            const lastWidth = needWidth - averageWidth * (showColWithWidth - 1);
            const resultColumn = newColumnList.map(col => {
              if (!col.width) {
                // 最后一个未配置宽度的列宽取差值
                if (
                  col.title === noWidthColumn[noWidthColumn.length - 1].title
                ) {
                  col.width = lastWidth;
                } else {
                  // 非最后一个未配置宽度的列，则取均值的向下取整值
                  col.width = averageWidth;
                }
              }
              return col;
            });
            resultTableColumnList = resultColumn;
          }
        }
      } else {
        // 都分配了宽度, 但是这个时候还是有剩余的宽度没有分配
        const otherWidth = totalWidth - wrapperWidth;
        const resultColumn = cloneDeep(newColumnList);
        // 将多余的宽度赋值给最后一非定位的列
        if (otherWidth > 0) {
          for (let i = newColumnList.length - 1; i >= 0; i--) {
            if (!newColumnList[i].fixed) {
              resultColumn[i].width =
                Number(newColumnList[i].width) + otherWidth;
              break;
            }
          }
        }

        // 获取未定位的列的数量
        // const noFixedLength = newColumnList.filter(col => !col.fixed).length;
        // const averageWidth = Math.floor(otherWidth / noFixedLength);
        // const lastWidth = otherWidth - averageWidth * (noFixedLength - 1);
        // resultColumn = newColumnList.map((col, index) => {
        //   if (col.fixed) return col;
        //   if (index !== noFixedLength - 1) {
        //     return { ...col, width: Number(col.width) - averageWidth };
        //   }
        //   return { ...col, width: Number(col.width) - lastWidth };
        // });

        resultTableColumnList = resultColumn;
      }
    }
    return resultTableColumnList;
  });

  // 此useEffect为第一次执行表格渲染时，生成对应的列配置
  useEffect(() => {
    // 初始化时，根据配置项，设置表格列的宽度，并记录对应百分比
    if (wrapperWidth && !isInit) {
      const resultTableCol = getTableNumberWidthCol();
      setTableShowColumns(resultTableCol);
      setInit(true);
    }
  }, [
    isInit,
    wrapperWidth,
    tableShowColumns,
    setInit,
    setTableShowColumns,
    getTableNumberWidthCol,
  ]);

  // 当容器宽度变化时，根据每列所占的比例，重新结算列宽
  useEffect(() => {
    if (wrapperWidth && isInit) {
      setTableShowColumns(oldColumns => {
        const result: ColumnType<any>[] = cloneDeep(oldColumns);

        const totalWidth = result.reduce(
          (sum, cur) => sum + parseFloat(`${cur.width!}`),
          0
        );
        let last: any;

        // 将剩余的无分配的差值赋值给最后一个不是固定的列
        for (let i = result.length - 1; i >= 0; i--) {
          if (!result[i].fixed) {
            last = result[i];
            break;
          }
        }
        if (last) {
          last.width = wrapperWidth + parseFloat(`${last.width!}`) - totalWidth;
        }
        result.filter((res: any) => {
          res.width = Math.max(res.width, 47);
        });
        return result;
      });
    }
  }, [isInit, wrapperWidth, setTableShowColumns]);

  function init() {
    const resultTableCol = getTableNumberWidthCol();
    setTableShowColumns(resultTableCol);
  }

  return {
    tableShowColumns,
    isInit,
    init,
  } as const;
};

export default useTableCol;
