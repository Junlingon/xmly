import { Divider, Radio, Table, Button } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Table1 = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
        },
    ];
    const [selectionType, setSelectionType] = useState('checkbox');
    const [selectionData, setSelectionData] = useState([]);
    // rowSelection object indicates the need for row selection
    const rowSelection = {
        //selectedRowKeys: 表示已选中的行的 key 值。
        //selectedRows: 表示已选中的行的数据。是一个对象数组的形式
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectionData(selectedRows)
        },
        //选择框的默认属性配置
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <div>
            <Radio.Group
                onChange={({ target: { value } }) => {
                    setSelectionType(value);
                }}
                value={selectionType}
            >
                <Radio value="checkbox">Checkbox</Radio>
                <Radio value="radio">radio</Radio>
            </Radio.Group>

            <Divider />

            <Table
                rowSelection={{    //用于定义行选择模式。
                    type: selectionType,  //type: 表示选择模式，可选值有 'checkbox' 和 'radio'。
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
            <div>
                {/* map记得return 或者把花括号变成小括号 */}
                选中的表单数据有：{selectionData.map((item) => {
                    return <ul key={item.key}>
                        <li>key:{item.key}</li>
                        <li>name:{item.name}</li>
                        <li>age:{item.age}</li>
                        <li>address:{item.address}</li>
                    </ul>
                })}
            </div>
        </div>
    );
}

const Table2 = () => {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];
    const data = [];
    for (let i = 0; i < 46; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div>
            <div
                style={{
                    marginBottom: 16,
                }}
            >
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Reload
                </Button>
                <span
                    style={{
                        marginLeft: 8,
                    }}
                >
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
    );
};


const App = () => {

    const { id } = useParams();
    switch (id) {
        case '1':
            return <Table1 />;
        case '2':
            return <Table2 />;
        default:
            return <div>table id 错误 404</div>;
    }
};
export default App;