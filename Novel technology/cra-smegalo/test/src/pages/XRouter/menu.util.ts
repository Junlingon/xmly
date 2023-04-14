export interface MENU_INTERFACE {
  childList: MENU_INTERFACE[];
  createdAt: string;
  menuIcon: any;
  menuId: number;
  menuLevel: number;
  menuLink: string;
  menuName: string;
  menuOrder: string;
  menuUrl: string;
  parentMenuId: any;
  parentMenuName: any;
  productCode: string;
  status: number;
  updatedAt: string;
}

interface PROLAYOUT_MENU {
  path: string;
  name?: string;
  routes?: PROLAYOUT_MENU[];
}

export function formatProlayoutMenu(
  menu: MENU_INTERFACE[]
):
  | {
      route: { path: string; routes: PROLAYOUT_MENU[] };
      location: { pathname: string };
    }
  | {} {
  if (!menu) return {};
  return {
    route: {
      path: '/',
      routes: getProlayoutMenu(menu),
    },
    location: {
      pathname: '/',
    },
  };
}

function getProlayoutMenu(
  menu: MENU_INTERFACE[]
): PROLAYOUT_MENU[] | undefined {
  if (!Array.isArray(menu)) return undefined;

  return menu.map((item: MENU_INTERFACE) => ({
    name: item.menuName,
    path: item.menuUrl,
    routes: item.childList && getProlayoutMenu(item.childList),
  }));
}
