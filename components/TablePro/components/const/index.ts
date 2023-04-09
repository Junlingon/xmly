import { OrderTypeEnum } from '@/constants/comman.const';

const showTypeEnum: OrderTypeEnum = {
  1: {
    value: 1,
    text: '全部',
  },
  2: {
    value: 2,
    text: '自定义',
  },
};

const customCheckEnum: OrderTypeEnum = {
  1: {
    value: 1,
    text: '选中',
  },
  2: {
    value: 2,
    text: '未选中',
  },
};

export { showTypeEnum, customCheckEnum };
