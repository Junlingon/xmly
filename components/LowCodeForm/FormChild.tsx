import {
  Select,
  Input,
  Radio,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
} from 'antd';
import { omit } from 'lodash-es';
import React, { FC } from 'react';

export type formChildType =
  | 'Select'
  | 'Input'
  | 'Radio'
  | 'Cascader'
  | 'DatePicker'
  | 'InputNumber'
  | 'TreeSelect'
  | 'Switch'
  | 'Checkbox';

interface Props {
  type: formChildType;
  [key: string]: any;
}

const FormChild: FC<Props> = props => {
  const { type, ...otherProps } = props;
  const other = otherProps;
  switch (type) {
    case 'Select':
      return (
        <Select {...omit(other, 'optionsConfig', 'options')}>
          {Array.isArray(other.options) &&
            other.options.map((option: any) => (
              <Select.Option
                key={option[other.optionsConfig?.value || 'value']}
                value={option[other.optionsConfig?.value || 'value']}
              >
                {option[other.optionsConfig?.name || 'name']}
              </Select.Option>
            ))}
        </Select>
      );
      break;
    case 'Input':
      return <Input {...other}></Input>;
      break;
    case 'Radio':
      return <Radio {...other}></Radio>;
      break;
    case 'Cascader':
      return <Cascader {...omit(other, 'children')}></Cascader>;
      break;
    case 'DatePicker':
      return <DatePicker {...other}></DatePicker>;
      break;
    case 'InputNumber':
      return <InputNumber {...other}></InputNumber>;
      break;
    case 'TreeSelect':
      return <TreeSelect {...other}></TreeSelect>;
      break;
    case 'Switch':
      return <Switch {...omit(other, 'children')}></Switch>;
      break;
    case 'Checkbox':
      return <Checkbox {...other}></Checkbox>;
      break;
    default:
      return <div>请配置表单类型</div>;
  }
};

export default FormChild;
