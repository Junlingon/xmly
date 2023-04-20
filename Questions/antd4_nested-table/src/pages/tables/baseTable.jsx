import { Space, Table, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';


const BaseTable = () => {
    const [data, setData] = useState([])
    const columns = [
        //columns 属性用于定义表格的列
        // title：列头显示的文本；
        // key：列的唯一标识，通常情况下使用 dataIndex 的值作为 key；
        // render：自定义单元格的渲染函数，可以用于实现复杂的单元格渲染；
        // width：列的宽度；
        // sorter：是否开启该列的排序功能，可以是一个布尔值或者一个函数；
        // filters：是否开启筛选功能，并定义筛选的选项；
        // onFilter：自定义筛选逻辑的函数；
        // fixed：设置列是否固定在左侧或右侧，可以是一个布尔值或者一个字符串 'left' 或 'right'；
        // ellipsis：是否省略单元格文本，可以设置为 true 或者一个 object 类型的值，用于自定义省略的样式和配置；
        // ...其他属性：根据具体的表格需求，还可以配置其他的属性，例如：align（单元格文本对齐方式）、filters（筛选项列表）、onCellClick（单元格的点击事件处理函数）等等。
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
            //参数分别为当前行的值，当前行数据，行索引
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {/* _在这里是一个数组，但是展示的像一个字符串 */}
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a onClick={() => { setData(data.filter(item => item.key !== record.key)) }}>Delete</a>
                </Space>
            ),
        },
    ];
    const Backdata = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    let rowKey = useRef(Backdata.length + 1)
    //  let rowKey = 4   这两者之间的区别在于 rowKey 是否使用了 hook。

    // 第一个方法中，rowKey 变量使用了普通的变量声明方式，
    // 在进行重新渲染时，rowKey 的值仍然是在第一次渲染时所赋予的值（即4）。
    // 因此，当您在界面上添加一个新行时，相同的 key 值可能会添加到多个行中，这会导致渲染错误和性能问题。

    // 而在第二种方法中，rowKey 使用了 useRef hook 声明，它是一种特殊的钩子，
    // 可用于在函数组件中保存可变值的引用。在这种方式中，
    // 变量的引用实际上是被保存在 current 属性中，而不是值本身。
    // 因此，在重新渲染时，rowKey.current 的值是实时更新的，可以确保新行的 key 值始终不会重复。
    const Add = () => {
        const newRecord = {
            key: rowKey.current,
            name: 'Joe Black',
            age: Math.floor(Math.random() * 33) + 18,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'picker'],
        }
        setData([...data, newRecord])
        ++rowKey.current
    }

    useEffect(() => {
        setData(Backdata)
    }, [])

    return (
        <>
            <a onClick={Add}>添加列表</a>
            <Table columns={columns} dataSource={data} />
        </>

    );
};
export default BaseTable;