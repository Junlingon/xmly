import React from 'react';
import FilterForm from './FilterForm';
import TableLayout from './TableLayout';
import CouponReducer from './index.reducer';
import CouponModal from './Modal';

const CouponSetting = () => {
  return (
    <CouponReducer>
      <>
        {/* 表单过滤器 */}
        <FilterForm />
        {/* 表格 */}
        <TableLayout />
        {/* 弹窗 */}
        <CouponModal />
      </>
    </CouponReducer>
  );
};

export default CouponSetting;
