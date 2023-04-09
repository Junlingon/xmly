import React, { useCallback, useEffect, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Drawer, Divider, Form, Radio, Button } from 'antd';
import DragCard, { DragType } from './DragCard';
import update from 'immutability-helper';
import HeadLine from '@/components/HeadLine';
import { showTypeEnum } from './const';
import { OrderType } from '@/constants/comman.const';
import { COLUMNS, formatColumnsToCustom, formatCustomToColumns } from './utils';
import { isFunction } from 'lodash-es';

interface Props {
  columns: any[];
  className: any;
  onOk?: (col: COLUMNS) => void;
}

function CustomColumns(props: Props) {
  const { columns, className, onOk } = props;
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [hover, setHover] = useState<any>({});

  const [tableLeftColumns, setTableLeftColumns] = useState<any[]>([]);

  const [tableCenterColumns, setTableCenterColumns] = useState<any[]>([]);

  const [tableFooterColumns, setTableFooterColumns] = useState<any[]>([]);

  useEffect(() => {
    const { left, center, right } = formatColumnsToCustom(columns);
    setTableLeftColumns(left);
    setTableCenterColumns(center);
    setTableFooterColumns(right);
  }, [columns]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number, from: DragType, to: DragType) => {
      const setMap = {
        left: setTableLeftColumns,
        center: setTableCenterColumns,
        footer: setTableFooterColumns,
      };
      if (from === to) {
        setMap[to]((prevCards: any[]) =>
          update(prevCards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevCards[dragIndex]],
            ],
          })
        );
      } else {
        setMap[from]((fromCards: any[]) => {
          setMap[to]((prevCards: any[]) =>
            update(prevCards, {
              $splice: [[hoverIndex, 0, fromCards[dragIndex]]],
            })
          );
          return update(fromCards, {
            $splice: [[dragIndex, 1]],
          });
        });
      }
    },
    []
  );

  function onValuesChange(values: any) {
    if (values.showType) {
      setColsDisabled(values.showType);
    }
  }

  // 禁用拖拽选中
  function setColsDisabled(showType: 1 | 2) {
    setTableLeftColumns((cols: any) => {
      return cols.map((col: any) => ({
        ...col,
        disabled: showType === showTypeEnum[1].value,
        check: true,
      }));
    });
    setTableCenterColumns((cols: any) => {
      return cols.map((col: any) => ({
        ...col,
        disabled: showType === showTypeEnum[1].value,
        check: true,
      }));
    });
    setTableFooterColumns((cols: any) => {
      return cols.map((col: any) => ({
        ...col,
        disabled: showType === showTypeEnum[1].value,
        check: true,
      }));
    });
  }

  function onCheckChange(val: boolean, type: DragType, index: number) {
    const setMap = {
      left: setTableLeftColumns,
      center: setTableCenterColumns,
      footer: setTableFooterColumns,
    };

    setMap[type]((prevCards: any[]) =>
      update(prevCards, {
        [index]: {
          check: {
            $set: val,
          },
        },
      })
    );
  }

  function onFinish() {
    const mergeColumns = formatCustomToColumns({
      left: tableLeftColumns,
      center: tableCenterColumns,
      right: tableFooterColumns,
    });

    isFunction(onOk) && onOk(mergeColumns);

    setVisible(false);
  }

  return (
    <>
      <SettingOutlined className={className} onClick={showDrawer} />
      <Drawer
        title="自定义列表设置"
        width={300}
        placement="right"
        onClose={onClose}
        open={visible}
        bodyStyle={{ padding: '12px' }}
        closable={false}
        footer={
          <div className="flex justify-end">
            <Button className="mr-4">取消</Button>
            <Button type="primary" onClick={onFinish}>
              确定
            </Button>
          </div>
        }
        destroyOnClose
      >
        <Form
          form={form}
          initialValues={{ showType: 2 }}
          onValuesChange={onValuesChange}
        >
          <div>
            <Form.Item
              label="显示方式"
              name="showType"
              style={{ marginBottom: 0 }}
            >
              <Radio.Group>
                {Object.values(showTypeEnum).map((showType: OrderType) => (
                  <Radio key={showType.value} value={showType.value}>
                    {showType.text}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>

          <Divider style={{ margin: '12px 0' }} />

          <HeadLine title="固定在队首" />
          <div className="py-4 flex flex-wrap">
            {tableLeftColumns.map((col: any, index: number) => (
              <DragCard
                type="left"
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                col={col}
                index={index}
                moveCard={moveCard}
                hover={hover}
                setHover={setHover}
                onCheckChange={onCheckChange}
              />
            ))}
          </div>

          <HeadLine title="非固定字段" />
          <div className="py-4 flex flex-wrap">
            {tableCenterColumns.map((col: any, index: number) => (
              <DragCard
                type="center"
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                col={col}
                index={index}
                moveCard={moveCard}
                hover={hover}
                setHover={setHover}
                onCheckChange={onCheckChange}
              />
            ))}
          </div>

          <HeadLine title="固定在队尾" />
          <div className="py-4 flex flex-wrap">
            {tableFooterColumns.map((col: any, index: number) => (
              <DragCard
                type="footer"
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                col={col}
                index={index}
                moveCard={moveCard}
                hover={hover}
                setHover={setHover}
                onCheckChange={onCheckChange}
              />
            ))}
          </div>
        </Form>
      </Drawer>
    </>
  );
}

export default React.memo(CustomColumns);
