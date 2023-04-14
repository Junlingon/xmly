import React, { useContext } from 'react';
import { defaultValue } from './constant';

const CouponContext = React.createContext(defaultValue);

function useCouponContext(): any {
  const value = useContext(CouponContext);

  return value;
}

export { CouponContext, useCouponContext };
