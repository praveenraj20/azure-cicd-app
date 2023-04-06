export interface IMenu {
  title: string;
  icon: string;
  selected: boolean;
  expanded: boolean;
}

export interface IMenus {
  path: string;
  view?: boolean;
  key?: string;
  menu: IMenu;
}

export interface INavMenus {
  expanded: boolean;
  icon: string;
  order: number;
  pathMatch: string;
  route: { data: any; path: string; paths: Array<string> };
  selected: boolean;
  target: string;
  title: string;
}

export interface IMenuOptionDefaults {
  dashboard: boolean;
  calendar: boolean;
  contracts: boolean;
  candidates: boolean;
  invoices: boolean;
  jobs: boolean;
}

export interface IRouteMenus {
  routeLink: string;
  icon: string;
  label: string;
  exact: boolean;
  query?: { type: string }
}
