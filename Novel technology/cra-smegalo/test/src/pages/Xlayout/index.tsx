import React, { FC } from 'react';
import './index.scoped.scss';
import XRouter from '@/pages/XRouter';
import XMenu from './XMenu';

const XLayout: FC = () => {
  return (
    <div className="flex h-full">
      <div className="flex-none h-full w200">
        <XMenu />
      </div>
      <div className="flex-grow px-4 pt-6 bg-gray-100 h-full overflow-auto">
        <div className="bg-white min-h-full">
          <XRouter />
        </div>
      </div>
    </div>
  );
};

export default XLayout;
