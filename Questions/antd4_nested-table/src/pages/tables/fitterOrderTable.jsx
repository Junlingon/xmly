import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Space, Table, Input } from 'antd';
import Highlighter from 'react-highlight-words'; // 导入关键字高亮组件
import { SearchOutlined } from '@ant-design/icons';

const Table1 = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            //这个是是筛选的提示框的data
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
                {
                    text: 'Jim',
                    value: 'Jim',
                },
                {
                    text: 'Submenu',
                    value: 'Submenu',
                    children: [
                        {
                            text: 'Green',
                            value: 'Green',
                        },
                        {
                            text: 'Black',
                            value: 'Black',
                        },
                    ],
                },
            ],
            // onFilter 配置项是用来过滤表格数据的函数
            //  value 当前筛选的值，在 filterDropdown 中输入的搜索条件
            //  record: 当前行的数据，在 Table 中的数据源 dataSource 中的某一行数据。
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Age',
            dataIndex: 'age',
            defaultSortOrder: 'descend', //默认排序
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
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
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park',
        },
    ];
    //分页、排序、筛选变化时触发
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return <Table columns={columns} dataSource={data} onChange={onChange} />;
}

const Table2 = () => {

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
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park',
        },
    ];

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
        //需要从Table的自带的onChange回调里面去拿到筛选出来的值和排序的值
    };
    const clearFilters = () => {
        setFilteredInfo({});
    };
    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };
    const setAgeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'age',
        });
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
                {
                    text: 'Jim',
                    value: 'Jim',
                },
            ],
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            filteredValue: filteredInfo.address || null,
            onFilter: (value, record) => record.address.includes(value),
            sorter: (a, b) => a.address.length - b.address.length,
            sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
            ellipsis: true,
        },
    ];
    return (
        <>
            <Space
                style={{
                    marginBottom: 16,
                }}
            >
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} dataSource={data} onChange={handleChange} />
        </>
    );
};

const Table3 = () => {
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Joe Black',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Jim Green',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park',
        },
    ];
    const [searchText, setSearchText] = useState(''); // 定义搜索文本的状态变量
    const [searchedColumn, setSearchedColumn] = useState(''); // 定义筛选列名的状态变量
    const searchInput = useRef(null); // 定义一个用于获取搜索框的变量
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]); //把输入框的值设置成高光
        setSearchedColumn(dataIndex); //找到当前筛选的列 是name or age or address
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({ // 生成配置对象以实现列筛选
        // 通过 filterDropdown 自定义的列筛选功能，渲染一个列筛选的下拉框。
        //在 filterDropdown 内部进行搜索操作之后，配合使用 onFilter 配置项来过滤数据
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            //参数分别表示 设置当前的搜索条件、当前的筛选条件、确认搜索、清除筛选条件、关闭下拉框等操作
            //filterDropdown 的 selectedKeys 值会作为参数 value 传递给 onFilter 函数使用，用来过滤表格数据。
            <div style={{ padding: 8 }}
                onKeyDown={(e) => e.stopPropagation()} //为了防止键盘事件冒泡，避免影响到其他组件
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])} //selectedKeys 属性的值需要是一个数组格式
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        // 设置一个放大镜的图标，不写的话为默认的那个图标
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? '#1890ff' : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        //当筛选下拉菜单打开或关闭时触发
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                //以免 searchInput 还没有渲染出来就执行了 select() 方法
                setTimeout(() => searchInput.current?.select(), 100);
                //通过 searchInput.current.select() 方法选中框中的文本
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]} //指定要高亮显示的关键字，这里的 searchText 就是我们输入的搜索关键字。
                    autoEscape //默认开启，用于转义搜索关键词中的特殊字符，例如 &、< 等，以便正常高亮显示。 
                    textToHighlight={text ? text.toString() : ''}
                //它会将 textToHighlight 中与 searchWords 匹配的关键字进行替换，替换后的关键字会被包裹在 <span className="highlight">...</span> 标签中，
                //并设置 highlightStyle 属性中指定的样式。而非关键字部分则保留原样。
                />
            ) : (text),
    });
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: '20%',
            ...getColumnSearchProps('age'),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
    ];
    return (<>
        搜索筛选菜单
        <Table columns={columns} dataSource={data} />
    </>);
}

const App = () => {
    const { id } = useParams();
    switch (id) {
        case '1':
            return <Table1></Table1>;
        case '2':
            return <Table2></Table2>;
        case '3':
            return <Table3></Table3>;
        default:
            return <div>table id 错误 404 </div>;
    }
}
export default App;