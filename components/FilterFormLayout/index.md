---
title: FilterFormLayout
nav:
  title: 组件
  path: /components-common
group:
  title: 通用组件
  path: /common
order: 4
---

### 筛选器表单布局

### 使用场景

常用于对表单的多条件查询, 超过配置数自动折叠,鼠标移入自动展开
配合 ant-design <a href="https://4x.ant.design/components/form-cn/#Form.Item" target="_blank">From.Item</a> 组件使用

### 代码演示

<code src="./Demo/Demo1.tsx" ></code>
<code src="./Demo/Demo4.tsx" ></code>
<code src="./Demo/Demo2.tsx" ></code>
<code src="./Demo/Demo3.tsx" ></code>

### API

#### 属性

##### FilterFormLayout

| 参数             | 说明                                                              | 类型                                                    | 默认值 | 版本 |
| ---------------- | ----------------------------------------------------------------- | ------------------------------------------------------- | ------ | ---- |
| children         | 组件内容                                                          | React.ReactNode 或 React.ReactNode[]                    | []     |      |
| onOk             | 查询回调                                                          | (formData: any) => void                                 | -      |      |
| onCreate         | 新增                                                              | () => void;                                             | -      |      |
| onBatchOutput    | 批量导出                                                          | () => void                                              | -      |      |
| onBatchInput     | 批量导入                                                          | () => void                                              | -      |      |
| onReset          | 重置回调                                                          | () => void                                              | -      |      |
| onValuesChange   | 改变回调                                                          | (changedValues: any, allValues: any, form: any) => void | -      |      |
| initialValues    | 表单初始值                                                        | any                                                     | {}     |      |
| labelCol         | antd 中 Form.Item 属性                                            | any                                                     | {}     |      |
| wrapperCol       | antd 中 Form.Item 属性                                            | any                                                     | {}     |      |
| labelWidth       | label 宽度                                                        | any                                                     | 84     |      |
| span             | 表单项宽度                                                        | number                                                  | 24     |      |
| collapsed        | 是否折叠超出的表单项，用于受控模式                                | boolean                                                 | false  |      |
| defaultCollapsed | 默认状态下是否折叠超出的表单项                                    | boolean                                                 | false  |      |
| preserve         | 是否能够查询收起的数据，如果设置为 true，收起后的表单数据将会丢失 | boolean                                                 | false  |      |
