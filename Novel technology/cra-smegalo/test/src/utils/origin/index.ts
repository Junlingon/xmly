/**
 * url origin
 *  - 推荐尽可能使用 https
 *  - 自动区分编译环境
 *  - 根据喜马拉雅各环境的 path 规则，自动生成 origin
 */

import generate from './generate';

/**
 * https://m.ximalaya.com
 */
export const ORIGIN_M = generate();

/**
 * https://mobile.ximalaya.com
 */
export const ORIGIN_MOBILE = generate({
  subdomain: 'mobile',
});

/**
 * https://pages.ximalaya.com
 */
export const ORIGIN_PAGES = generate({
  subdomain: 'pages',
});

/**
 * https://www.ximalaya.com
 */
export const ORIGIN_WWW = generate({
  subdomain: 'www',
});

/**
 * https://passport.ximalaya.com
 */
export const ORIGIN_PASSPORT = generate({
  subdomain: 'passport',
});

/**
 * https://open.ximalaya.com
 */
export const ORIGIN_OPEN = generate({
  subdomain: 'open',
});

/**
 * https://ops.ximalaya.com
 */
export const ORIGIN_OPS = generate({
  subdomain: 'ops',
});
