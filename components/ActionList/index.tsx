import { ActionList as OriginalActionList } from '@xmly/mi-design';
import { ActionProps } from '@xmly/mi-design/dist/components/common/ActionList/index';

export default function ActionList(props: ActionProps) {
  return <OriginalActionList max={4} {...props} />;
}
