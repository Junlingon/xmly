import { baseUrl } from '@/constants/comman.const';
import $axios from './$axios';
import { CommonAxiosReponse } from './types';

// 开票信息查询
export function getInvoiceList(params: {
  pageNum: number;
  pageSize: number;
  commodityCoding?: string;
}): Promise<CommonAxiosReponse> {
  return $axios.get(`${baseUrl}/sellerInfo/queryByCondition`, {
    params,
  });
}

// 开票信息新增
export function createInvoice(data: any): Promise<CommonAxiosReponse> {
  return $axios.post(`${baseUrl}/sellerInfo/create`, data);
}

// 开票信息删除
export function deleteInvoice(params: {
  commodityCoding: string;
}): Promise<CommonAxiosReponse> {
  return $axios.get(`${baseUrl}/sellerInfo/delete`, {
    params,
  });
}

// 开票信息更新
export function updateInvoice(data: any): Promise<CommonAxiosReponse> {
  return $axios.post(`${baseUrl}/sellerInfo/update`, data);
}
