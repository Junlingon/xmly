/**
 * Craco 重写 CRA 配置
 *  - GitHub：https://github.com/gsoft-inc/craco
 *  - 配置参数：https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration-overview
 *  - 快速指南：https://blog.eleven.net.cn/2020/09/11/cra/craco/
 *
 * Tips：
 *  1、区分 node 运行环境 —— NODE_ENV
 *    - whenDev ☞ process.env.NODE_ENV === 'development'
 *    - whenTest ☞ process.env.NODE_ENV === 'test'
 *    - whenProd ☞ process.env.NODE_ENV === 'production'
 *  2、NODE_ENV 可以区分 node 运行环境，仅支持 development、test、production，
 *    自定义的 REACT_APP_BUILD_ENV 用于区分编译环境，支持 development、test、uat、production。
 *  3、craco 有提供一些好用的 plugin（https://github.com/gsoft-inc/craco#community-maintained-plugins），推荐优先考虑使用现成的 craco plugin 去解决问题。
 *  4、CRA 脚手架相关的配置覆盖，优先使用 craco 提供的快捷方式去配置。解决不了的问题，在 configure 函数中配置。
 *    推荐 configure 配置使用函数形式，而非对象形式。虽然，函数形式更复杂了一点，但是二者是互斥的，只能选择其中一种。
 */


module.exports = {

};