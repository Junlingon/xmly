import { FormItemProps, SelectProps } from 'antd';
import { formChildType } from './FormChild';

export type methodType = 'create' | 'update' | 'view';

// 控制表单新增,编辑, 查看展示
export interface hideInterface {
  createHide?: boolean; // 新增隐藏
  updateHide?: boolean; // 编辑隐藏
  viewHide?: boolean; // 详情隐藏
}

// 下拉框数据
export interface optionInterface {
  options?: Record<string, any>[];
  optionsConfig?: {
    name: string;
    value: string;
  };
}

export type hideKeysType = keyof hideInterface;

export interface formChildInterface
  extends optionInterface,
    hideInterface,
    FormItemProps,
    SelectProps {
  type: formChildType;
}
