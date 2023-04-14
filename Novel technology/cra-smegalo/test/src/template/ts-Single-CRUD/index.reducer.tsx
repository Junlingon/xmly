import { getInvoiceList } from '@/services/sellerInfo';
import React, { useReducer } from 'react';
import { defaultValue } from './constant';
import { CouponContext } from './index.context';

interface Props {
  children?: React.ReactNode;
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'setFilterForm':
      return {
        ...state,
        filterForm: { ...state.filterForm, ...action.payload },
      };
    case 'resetFilterForm':
      return {
        ...state,
        filterForm: {},
      };
    case 'setModalVisible':
      return {
        ...state,
        modalVisible: action.payload,
      };
    case 'setState':
      return {
        ...state,
        ...action.payload,
      };

    default:
      throw new Error();
  }
}

const CouponReducer = (props: Props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, defaultValue);

  const { pagination } = state;

  // 设置表单
  function setFilterForm(values: any) {
    dispatch({
      type: 'setFilterForm',
      payload: values,
    });
  }

  function resetFilterForm() {
    dispatch({
      type: 'resetFilterForm',
    });
  }

  function setModalVisible(bool: boolean) {
    dispatch({
      type: 'setModalVisible',
      payload: bool,
    });
  }

  function setState(value: any) {
    dispatch({
      type: 'setState',
      payload: value,
    });
  }

  function onCreate() {
    setState({
      modalVisible: true,
      modalType: 'create',
      modalData: {},
    });
  }

  function onEdit(data: any) {
    setState({
      modalVisible: true,
      modalType: 'edit',
      modalData: data,
    });
  }

  function getList(values: any = {}) {
    setState({
      dataSource: {
        data: state.dataSource.data,
        success: false,
        error: false,
        done: false,
      },
    });

    getInvoiceList({
      pageSize: pagination.pageSize,
      pageNum: pagination.current,
      ...state.filterForm,
      ...values,
    })
      .then((res: any) => {
        setState({
          dataSource: {
            data: res.data,
            success: true,
            error: false,
            done: true,
          },
          pagination: {
            current: res.pageId,
            pageSize: res.pageSize,
            total: res.totalCount,
          },
        });
      })
      .catch(() => {
        setState({
          dataSource: {
            data: [],
            success: false,
            error: true,
            done: true,
          },
        });
      });
  }

  return (
    <CouponContext.Provider
      value={{
        ...state,
        dispatch,
        setFilterForm,
        resetFilterForm,
        setModalVisible,
        setState,
        getList,
        onCreate,
        onEdit,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export default CouponReducer;
