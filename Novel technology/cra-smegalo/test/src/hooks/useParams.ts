import { useState } from 'react';

export default (defaultParams: any) => {
  const [params, setParams] = useState(defaultParams);

  function resetParams() {
    setParams(defaultParams);
  }

  return [params, setParams, resetParams];
};
