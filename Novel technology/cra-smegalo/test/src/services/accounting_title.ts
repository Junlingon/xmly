import $axios from '@/utils/$axios';
import { baseUrl } from '@/constants/comman.const';
import { CommonAxiosReponse } from './types';

// 科目查询
export function getAccounting(data: any): Promise<CommonAxiosReponse> {
  return $axios.post(
    `${baseUrl}/biz_financial/accounting_title/query.do`,
    data
  );
}
