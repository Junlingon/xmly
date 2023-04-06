import { FormLayout } from 'antd/lib/form/Form';

const maxSpan = 24;

export interface layoutConfigInterface {
  block: 4 | 3 | 2 | 1; // 一行分几块
  span: number;
  layout: FormLayout;
  offset?: number;
  labelCol?: {
    flex: string;
  };
  wrapperCol?: {
    style: {
      maxWidth: string;
      span?: number;
    };
  };
  canCollapse?: boolean; // 是否可折叠 (数量不足 展开/折叠按钮隐藏)
}

const getLayoutConfig = (
  labelWidth: number,
  formItemLength: number,
  span: number,
  width?: number,
): layoutConfigInterface => {
  let innerwidth = width || 0;
  const config: layoutConfigInterface = {
    block: 1,
    span: maxSpan,
    layout: 'vertical',
    canCollapse: formItemLength > 1,
  };
  if (innerwidth >= 1200) {
    config.block = 4;
    config.span = maxSpan / config.block;
    config.layout = 'horizontal';
    config.labelCol = { flex: `${labelWidth}px` };
    config.wrapperCol = {
      style: { maxWidth: `calc(100% - ${labelWidth}px)`, span },
    };
    // 计算查询按钮组展开偏移量
    config.offset =
      (config.block - ((formItemLength + 1) % config.block)) * config.span;
    config.offset = config.offset === 24 ? 0 : config.offset;
    config.canCollapse = formItemLength + 1 > config.block;
    return config;
  }
  if (innerwidth >= 1062) {
    config.block = 3;
    config.span = maxSpan / config.block;
    config.layout = 'horizontal';
    config.labelCol = { flex: `${labelWidth}px` };
    config.wrapperCol = {
      style: { maxWidth: `calc(100% - ${labelWidth}px)`, span },
    };
    config.offset =
      (config.block - ((formItemLength + 1) % config.block)) * config.span;
    config.offset = config.offset === 24 ? 0 : config.offset;
    config.canCollapse = formItemLength + 1 > config.block;
    return config;
  }
  if (innerwidth >= 701) {
    config.block = 2;
    config.span = maxSpan / config.block;
    config.layout = 'horizontal';
    config.labelCol = { flex: `${labelWidth}px` };
    config.wrapperCol = {
      style: { maxWidth: `calc(100% - ${labelWidth}px)`, span },
    };
    config.offset =
      (config.block - ((formItemLength + 1) % config.block)) * config.span;
    config.offset = config.offset === 24 ? 0 : config.offset;
    config.canCollapse = formItemLength + 1 > config.block;
    return config;
  }
  if (innerwidth >= 513) {
    config.block = 2;
    config.span = maxSpan / config.block;
    config.layout = 'vertical';
    config.labelCol = undefined;
    config.wrapperCol = undefined;
    config.offset =
      (config.block - ((formItemLength + 1) % config.block)) * config.span;
    config.offset = config.offset === 24 ? 0 : config.offset;
    config.canCollapse = formItemLength + 1 > config.block;
    return config;
  }

  return config;
};

const getVisibility = (
  index: number,
  block: number,
  _collapsed: boolean,
): 'hidden' | 'visible' => {
  if (_collapsed) return 'visible';
  return index + 1 > (block - 1 || 1) ? 'hidden' : 'visible';
};

const getOpacity = (
  index: number,
  block: number,
  _collapsed: boolean,
): '0' | '1' => {
  if (_collapsed) return '1';
  return index + 1 > (block - 1 || 1) ? '0' : '1';
};
const getHeight = (
  index: number,
  block: number,
  _collapsed: boolean,
): '0px' | '55px' => {
  if (_collapsed) return '55px';
  return index + 1 > (block - 1 || 1) ? '0px' : '55px';
};
const getDisplay = (
  index: number,
  block: number,
  _collapsed: boolean,
): 'none' | 'block' => {
  if (_collapsed) return 'block';
  return index + 1 > (block - 1 || 1) ? 'none' : 'block';
};

export { getLayoutConfig, getVisibility, getOpacity, getHeight, getDisplay };
