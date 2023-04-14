import { Routes } from '@/pages/XRouter/router';

// 查找第一个匹配路由全路径
export function getRoutePath(routeList: Routes[]) {
  let path = '';
  for (let i = 0; i < routeList.length; i++) {
    const route = routeList[i];
    if (route.children && route.children.length > 0) {
      path = route.path + getRoutePath(route.children);
      break;
    } else if (route.path) {
      path += route.path;
      break;
    }
  }

  return path;
}
