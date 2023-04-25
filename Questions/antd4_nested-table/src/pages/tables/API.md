## rowSelection
一般用于table多行设置选择回调，避免给每行的单选去写一个onchange函数等一些多次配置的回调
是一个对象的形式，
selectedRowKeys指定选中项的 key 数组，需要和 onChange 进行配合
onChange 选中项发生变化时的回调