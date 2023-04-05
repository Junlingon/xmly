import React, { useState } from 'react';
import { Table, Input, InputNumber, Form } from 'antd';

interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}

const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  index: number;
}

const EditableCell: React.FC<EditableCellProps> = ({
  dataIndex,
  title,
  inputType,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      }
    </td>
  );
};

type EditableTableProps = Parameters<typeof Table>[0];

interface EditableProps {
  editable?: React.ReactNode | 'input';
}

type Props = EditableTableProps & EditableProps;

const EditTable = (props: Props) => {
  const { columns } = props;

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  console.log('setData', setData);

  const mergedColumns = columns?.map((col: any) => {
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
};

export default EditTable;
