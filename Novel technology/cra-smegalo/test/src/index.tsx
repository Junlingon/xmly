// 等价于 import 'react-app-polyfill/stable'（React 官方不常升级 core-js）。
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// 兼容支持到 IE9，如果不需要可删除。
import 'react-app-polyfill/ie9';
import './assets/styles/index.scss';
import './assets/styles/tailwind.css';
import './App.init';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import * as Sentry from '@sentry/react';
import App from './App';
// import '@/mock';

// {/* https://docs.sentry.io/platforms/javascript/guides/react/components/errorboundary/ */}
// {/* https://github1s.com/getsentry/sentry-javascript/blob/HEAD/packages/react/src/errorboundary.tsx */}
ReactDOM.render(
  <Sentry.ErrorBoundary>
    <App />
  </Sentry.ErrorBoundary>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
