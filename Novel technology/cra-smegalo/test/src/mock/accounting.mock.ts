const Mock = require('mockjs');

const initMoAccounting = (open: boolean = false) => {
  if (open) {
    // 科目查询
    Mock.mock(/\/biz_financial\/accounting_title\/query.do/, () => {
      return {
        rspCode: '0000',
        rspMsg: '成功',
        body: [
          {
            code: '101011',
            name: '银行',
            level: 2,
            parentCode: '1010',
            isChild: 1,
          },
        ],
      };
    });
  }
};

export default initMoAccounting;
