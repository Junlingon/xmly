import React, { FC, useState } from 'react';
import { UploadSdk } from '@xmly/xm-uploader';
import { Button, message, Spin, Upload, UploadFile } from 'antd';
import { isFunction } from 'lodash-es';
import './index.scoped.scss';
import fileExcelImg from '@/assets/images/batchImport/file-excel.png';
import excelImg from '@/assets/images/batchImport/excel.png';

interface Props {
  fileList?: UploadFile[];
  children?: any;
  beforeUpload?: ([error, file]: [any, any]) => void;
  onChange?: (value: any) => void;
  maxCount?: number; // 限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件
}

// 上传文件
const UploadDocument: FC<Props> = (props: Props) => {
  const { children, beforeUpload, onChange, fileList } = props;

  const [loading, setLoading] = useState(false);
  const isUpload = !!fileList;

  const imgSrc = isUpload ? excelImg : fileExcelImg;

  function _beforeUpload(files: any) {
    if (files.size > 2 * 1024 * 1024) {
      message.error({
        message: '文件大小不能超过2M',
      });
      return Upload.LIST_IGNORE;
    }

    setLoading(true);

    // files为文件数组
    UploadSdk([files] as any, {
      ops: true,
      config: {
        // 必填项，业务方可以用已申请的，也可以向 @严焰明、黄栋亮申请新的
        APP_KEY: 'supplyChain',
        APP_SERCRET: 'bjB5LzBHWEtT',
        uploadType: 'supplyChainDocument',
        accept: {
          title: '', // 随意填写
          extensions: 'XLS,XLSX,XLSM,XLSB,XLTX,XLTM,XML', // 例如：'PNG,JPG'
          mimeTypes: '.xls,.xlsx,.xlsm,.xlsb,.xltx,.xltm,.xml', // 例如：'.PNG,.JPG'、'image/*'
        },
        speedUp: true, // 是否开启在Chrome内核inactive状态下提速，目前针对内部系统只需要前端配置，对外系统还需要后台白名单
        fileSingleSizeLimit: 2 * 1024 * 1024, // 单个文件大小上限，单位：b
      },
    })
      .then((res: any) => {
        // res:{data: [], ret, msg},data:上传成功的返回的数据组合成数组返回
        res[0].name = files.name;
        res[0].size = files.size;
        res[0].type = files.type;
        isFunction(beforeUpload) && beforeUpload([null, res]);
      })
      .catch(error => {
        isFunction(beforeUpload) && beforeUpload([error, null]);
      })
      .finally(() => {
        setLoading(false);
      });

    return false;
  }

  function _onChange(res: any) {
    isFunction(onChange) && onChange(res);
  }

  return (
    <Upload.Dragger
      style={{ backgroundColor: '#fff' }}
      className="batch-excel-upload-dragger"
      {...props}
      onChange={_onChange}
      accept=".xls,.xlsx,.xlsm,.xlsb,.xltx,.xltm,.xml"
      listType="text"
      beforeUpload={(file: any) => _beforeUpload(file)}
      showUploadList={false}
    >
      <Spin spinning={loading}>
        {children || (
          <div className="dragger-box">
            <div className="text-center">
              <img src={imgSrc} alt="" className="img" />
            </div>
            {isUpload ? (
              <>
                {fileList?.map(file => (
                  <div className="mb-2 mt-2">{file.name}</div>
                ))}
                <div className="text-center">
                  <Button>重新上传</Button>
                </div>
              </>
            ) : (
              <>
                <div className="t-1">点击或将文件拖拽到这里上传</div>
                <div className="t-2">
                  <div>1. 仅支持Excel格式文件, 且大小不能超过2MB;</div>
                  <div>2. 为保证上传成功, 请勿对模板中的单元格进行更改;</div>
                </div>
              </>
            )}
          </div>
        )}
      </Spin>
    </Upload.Dragger>
  );
};

export default UploadDocument;

// 组件文档 http://gitlab.ximalaya.com/anchor-front-end/npm/xm-uploader
// 上传资源文档
// http://gitlab.ximalaya.com/x-fm/xmly-boot-upload-starter/wikis/7.%E5%89%8D%E7%AB%AF%E4%B8%8A%E4%BC%A0SDK%E6%8E%A5%E5%85%A5
// 新后台: https://ops.test.ximalaya.com/gatekeeper/ops-general-service-ts/uploadService
// 老后台: http://ops.test.ximalaya.com/access-platform/app
