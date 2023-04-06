import { Injectable } from "@angular/core";
import { IMenuOptionDefaults, IMenus } from "../core/models";

@Injectable({
  providedIn: 'root'
})
export class PageMenuService {
  menus: Array<{ path: string, children: Array<IMenus> }> = [];
  defaults: IMenuOptionDefaults = {
    calendar: true,
    candidates: true,
    contracts: true,
    dashboard: true,
    invoices: true,
    jobs: true,
  };

  constructor() { }

  GET_MENUS(): Array<any> {
    return [
      {
        path: '',
        children: this.getChildrens(),
      },
    ];
  }

  protected getChildrens(): Array<IMenus> {
    var children: Array<IMenus> = this.defaultMenus();
    for (const [key, value] of Object.entries(this.defaults)) {
      children.forEach((ele: IMenus, i: number) => {
        ele.key === key ? (children[i].view = Boolean(value)) : null;
      });
    }
    children = children.filter((ele: any) => ele.view === true);
    return children;
  }

  defaultMenus(): Array<IMenus> {
    return [

      {
        path: 'dashboard',
        menu: {
          title: 'Dashboard',
          icon: 'dashboard',
          selected: false,
          expanded: false
        }
      },
      {
        path: 'in-hiring',
        menu: {
          title: 'In hiring',
          icon: 'list_alt',
          selected: false,
          expanded: false,
        }
      },
      {
        path: 'candidates',
        menu: {
          title: 'Candidates',
          icon: 'people',
          selected: false,
          expanded: false,
        }
      },
      {
        path: 'contracts',
        menu: {
          title: 'Contracts',
          icon: 'assignment',
          selected: false,
          expanded: false,
        }
      },
      {
        path: 'calendar',
        menu: {
          title: 'Calendar',
          icon: 'calendar_today',
          selected: false,
          expanded: false,
        }
      },
      {
        path: 'invoices',
        menu: {
          title: 'Invoice',
          icon: 'description',
          selected: false,
          expanded: false,
        }
      }
    ]
  }
}
