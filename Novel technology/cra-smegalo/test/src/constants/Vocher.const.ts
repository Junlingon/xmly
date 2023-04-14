interface OrderType {
  text: string;
  value: string;
}

type OrderTypeEnum = Record<string, OrderType>;

// 订单类型 && 交易类型
// 交易-1-借
// 退款-2-贷
// 提现-3-贷
// 充值-4-借
const orderTypeEnum: OrderTypeEnum = {
  1: {
    text: '交易',
    value: '1',
  },
  2: {
    text: '退款',
    value: '2',
  },
  3: {
    text: '提现',
    value: '3',
  },
};

export { orderTypeEnum };
