export const formatWidth = (columns: any) => {
  columns.forEach((column: any) => {
    if (!column.width && typeof column.title === 'string') {
      let times = 30;
      if (column.title.length <= 2) times = 35;
      column.width = column.title.length * times;
    }
  });
  return columns;
};
