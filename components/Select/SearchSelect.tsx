import { Select } from 'antd';
import React, { FC, useEffect } from 'react';
import { debounce } from 'lodash-es';
import useHttp from '@/hooks/useHttp';
import { isFunction } from 'lodash';
import { CommonAxiosReponse } from '@/services/types';
import { InternalSelectProps } from 'antd/lib/select';

interface Props extends InternalSelectProps<any> {
  fetchFn: (data: any) => Promise<CommonAxiosReponse>;
  zhName: string;
  value?: any;
  onChange?: (value: any) => void;
  onSelect?: (option: any) => void;
  disabled?: boolean;
  fileNames?: { value: string; name: string };
  searchKey?: string;
  filterList?: (list: any) => void; // 请求接口过滤方法
  filterOption?: boolean;
  defautList?: any[]; // 初始化下拉数据
  initialList?: any[]; // 受控下拉数据
  labelInValue?: boolean;
  needInit?: boolean; // 是否需要初始化
  extraParams?: any;
  className?: any;
  style?: React.CSSProperties;
  allowClear?: boolean;
  secondData?: string;
  mode?: 'multiple' | 'tags'; // 多选框
  isShowCode?: boolean;
  placeholder?: string;
}

// mock
// eslint-disable-next-line no-lone-blocks
{
  /* <SearchSelect
  fileNames={{
    value: 'organizationCode',
    name: 'organizationName',
  }}
  fetchFn={getOrganizationList}
  zhName="采购组织"
/> */
}

const SearchSelect: FC<Props> = (props: Props) => {
  const {
    value,
    onChange,
    onSelect,
    fileNames = { value: 'value', name: 'name' },
    fetchFn,
    searchKey = 'nameLike',
    zhName,
    filterList,
    defautList,
    initialList,
    needInit,
    extraParams,
    secondData,
    mode,
    isShowCode,
    ...otherProps
  } = props;
  const [list, getList, status, setList] = useHttp({
    fetchFn,
    filterList,
    defaultRes: defautList,
    initialRes: initialList,
  });

  const listData = list ? (secondData ? list[secondData] : list) : [];

  // useEffect(() => {
  //   getList(extraParams)
  // }, []);

  useEffect(() => {
    needInit && getList(extraParams);
  }, [extraParams, needInit]);

  function handleSearch(value: any) {
    if (value) {
      getList({ [searchKey]: value, ...extraParams });
    } else {
      setList([]);
    }
  }

  function _onSelect(value: any) {
    const select = listData.find(
      (item: any) => item[fileNames.value] === value
    );
    if (isFunction(onSelect) && select) onSelect(select);
  }

  return (
    <Select
      loading={status.pending}
      value={value}
      onChange={onChange}
      showSearch
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={debounce(handleSearch, 300)}
      notFoundContent={'暂无数据'}
      onSelect={_onSelect}
      placeholder={`请搜索选择${zhName}名称`}
      allowClear
      mode={mode}
      style={{ minWidth: 100 }}
      {...otherProps}
    >
      {isShowCode
        ? (listData || []).map((item: any) => (
            <Select.Option
              key={item[fileNames.value]}
              value={item[fileNames.value]}
            >
              {item[fileNames.value]}（{item[fileNames.name]}）
            </Select.Option>
          ))
        : (listData || []).map((item: any) => (
            <Select.Option
              key={item[fileNames.value]}
              value={item[fileNames.value]}
            >
              {item[fileNames.name]}
            </Select.Option>
          ))}
    </Select>
  );
};

export default SearchSelect;
