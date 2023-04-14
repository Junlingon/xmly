import { useCallback, useState } from 'react';
import { isFunction } from 'lodash';

interface Props {
  fetchFn: any;
  params?: any;
  defaultKey?: string;
  defaultRes?: any;
  filterList?: (list: any) => void;
}

type Status = {
  success: boolean;
  pending: boolean;
  done: boolean;
  error: boolean;
}; // 异步状态

export default (props: Props) => {
  const {
    fetchFn,
    params,
    defaultKey = 'body',
    defaultRes = [],
    filterList,
  } = props;

  const [list, setList] = useState(defaultRes);
  const [status, setStatus] = useState<Status>({
    success: false,
    pending: false,
    done: false,
    error: false,
  });

  const getList = useCallback(
    data => {
      setStatus({ ...status, pending: true });
      fetchFn({ ...params, ...data })
        .then((res: Record<string, any>) => {
          if (isFunction(filterList)) {
            setList(filterList(res[defaultKey]));
          } else {
            setList(res[defaultKey]);
          }
          setStatus({ ...status, pending: false, success: true });
        })
        .catch(() => {
          setStatus({ ...status, pending: false, error: true });
        });
    },
    [defaultKey, fetchFn, filterList, params, status]
  );

  return [list, getList, status];
};
