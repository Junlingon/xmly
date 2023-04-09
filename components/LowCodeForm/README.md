# JSON 生成表单

DEMO

```javascript
[
  {
    type: 'Input',
    label: '支付宝账号',
    name: 'bindingAlipayLogonId',
    rules: [
      {
        required: true,
        message: '请输入支付宝账号',
      },
    ],
  },
  {
    type: 'Select',
    label: '是否自动开票',
    name: ['invoiceInfo', 'autoInvoice'],
    rules: [
      {
        required: true,
        message: '请选择是否自动开票',
      },
    ],
    options: [
      { name: 'true', value: true },
      { name: 'false', value: false },
    ],
  },
];
```
