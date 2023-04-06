import { DownOutlined } from '@ant-design/icons';
import { useSize } from 'ahooks';
import { Button, Col, Form, Row } from 'antd';
import { isFunction } from 'lodash';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { defaultPrefixCls } from '../../config';
import {
  getDisplay,
  getHeight,
  getLayoutConfig,
  getOpacity,
  getVisibility,
  layoutConfigInterface,
} from './untils';

export interface Props {
  children: React.ReactNode | React.ReactNode[]; // 表单内容
  onOk?: (formData: any) => void; // 查询回调
  onCreate?: () => void; // 新增
  onBatchOutput?: () => void; // 批量导出
  onBatchInput?: () => void; // 批量导入
  onReset?: () => void; // 重置回调
  onValuesChange?: (changedValues: any, allValues: any, form: any) => void; // 重置回调
  initialValues?: any; // 表单初始值
  defaultValue?: any;
  labelCol?: any;
  wrapperCol?: any;
  labelWidth?: number; // 	label 宽度
  span?: number; // 表单项宽度
  collapsed?: boolean; // 是否折叠超出的表单项，用于受控模式
  defaultCollapsed?: boolean; // 默认状态下是否折叠超出的表单项
  onCollapse?: (collapsed: boolean) => void;
  preserve?: boolean; // 是否能够查询收起的数据，如果设置为 true，收起后的表单数据将会丢失
  cardContainer?: any;
  prefixCls?: string;
  IsCollapsed?: boolean;
  IsTransition?: boolean;
}

export interface RefProps {
  form: any;
}

const FilterFormLayout = forwardRef<RefProps, Props>((props, ref) => {
  const {
    onOk,
    onReset,
    onCreate,
    onBatchOutput,
    onBatchInput,
    onValuesChange,
    initialValues = {},
    defaultValue = {},
    labelWidth = 84, // 标题最多7个字
    children,
    span = 24,
    collapsed,
    defaultCollapsed = false,
    onCollapse,
    preserve,
    cardContainer,
    prefixCls = defaultPrefixCls,
    IsCollapsed = false,
    IsTransition = false,
  } = props;
  const childrenNodes: React.ReactNode[] = Array.isArray(children)
    ? children
    : [children];

  const [_collapsed, setCollapsed] = useState(defaultCollapsed);

  const filterRef = useRef(null);
  const size = useSize(filterRef);
  const [layoutConfig, setLayoutConfig] = useState<layoutConfigInterface>({
    block: 3,
    canCollapse: true,
    layout: 'horizontal',
    offset: 0,
    span: 0,
  });

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    form,
  }));

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    typeof collapsed === 'boolean' && setCollapsed(collapsed);
  }, [collapsed]);

  useEffect(() => {
    setLayoutConfig(
      getLayoutConfig(labelWidth, childrenNodes.length, span, size?.width),
    );
  }, [labelWidth, size, childrenNodes.length, span]);

  function _onFinish() {
    if (isFunction(onOk)) onOk(form.getFieldsValue());
  }

  function _onValuesChange(changedValues: any, allValues: any) {
    if (isFunction(onValuesChange))
      onValuesChange(changedValues, allValues, form);
  }

  function _onReset() {
    form.resetFields();
    if (isFunction(onReset)) onReset();
  }

  function _onCollapse() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    IsCollapsed && setCollapsed(!_collapsed);

    setTimeout(() => {
      if (isFunction(cardContainer?.tableLayoutRef.current?.setTableScroll)) {
        cardContainer.tableLayoutRef.current?.setTableScroll();
      }
    });

    if (isFunction(onCollapse)) onCollapse(!_collapsed);
  }

  function _onMouseOver() {
    if (!_collapsed && IsCollapsed) {
      _onCollapse();
    }
  }

  return (
    <Form
      form={form}
      className={`${prefixCls}-filterForm-layout w-full`}
      name="basic"
      initialValues={initialValues}
      defaultValue={defaultValue}
      onFinish={_onFinish}
      onValuesChange={_onValuesChange}
      labelCol={layoutConfig.labelCol}
      wrapperCol={layoutConfig.wrapperCol}
      layout={layoutConfig.layout}
      preserve={preserve}
      colon={false}
    >
      <div
        ref={filterRef}
        onMouseLeave={() => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          _collapsed === true && _onCollapse();
        }}
      >
        <Row gutter={8}>
          <div
            onMouseOver={_onMouseOver}
            style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}
          >
            {size?.width
              ? childrenNodes
                  .filter((v) => v)
                  .map((child: any, index) => {
                    if (!child) return null;
                    return (
                      <Col
                        style={
                          IsCollapsed
                            ? {
                                display: IsTransition
                                  ? getDisplay(
                                      index,
                                      layoutConfig.block,
                                      _collapsed,
                                    )
                                  : 'unset',
                                visibility: getVisibility(
                                  index,
                                  layoutConfig.block,
                                  _collapsed,
                                ),
                                opacity: getOpacity(
                                  index,
                                  layoutConfig.block,
                                  _collapsed,
                                ),
                                height: getHeight(
                                  index,
                                  layoutConfig.block,
                                  _collapsed,
                                ),
                                transition: `all 1s ease-in-out`,
                                transform: `translate3d(0, 0, 0)`, // 开启硬件加速
                              }
                            : {}
                        }
                        span={child.props.span || layoutConfig.span} // 支持表单span参数
                        key={index}
                      >
                        {child}
                      </Col>
                    );
                  })
              : null}
          </div>
          <Col
            span={24}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            {onReset || onOk ? (
              <Form.Item label=" " labelCol={{}} colon={false}>
                <div className="">
                  <div className="flex items-center">
                    {onOk && (
                      <Button type="primary" htmlType="submit">
                        查询
                      </Button>
                    )}

                    {onReset && (
                      <Button onClick={_onReset} className="ml-2">
                        重置
                      </Button>
                    )}
                    {layoutConfig.canCollapse && (
                      <DownOutlined
                        className={` ml-2 down-qut-icon cursor-pointer ${
                          _collapsed ? '' : 'active'
                        }`}
                      />
                    )}
                  </div>
                </div>
              </Form.Item>
            ) : null}
          </Col>
          {onCreate && (
            <Col className="mb-4">
              <div className="flex">
                <Button type="primary" onClick={onCreate}>
                  新增
                </Button>
              </div>
            </Col>
          )}
          {onBatchOutput && (
            <Col className="mb-4">
              <div>
                <Button type="primary" onClick={onBatchOutput}>
                  批量导出
                </Button>
              </div>
            </Col>
          )}
          {onBatchInput && (
            <Col className="mb-4">
              <div>
                <Button type="primary" onClick={onBatchInput}>
                  批量导入
                </Button>
              </div>
            </Col>
          )}
        </Row>
      </div>
    </Form>
  );
});

export default FilterFormLayout;
