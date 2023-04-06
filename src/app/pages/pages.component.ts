import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { PageMenuService } from './pages.menu';
import { GlobalService } from '../global.service';
import { MenuService } from '../theme/services/menu.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  menuCollapsed: boolean = false;

  constructor(
    private readonly _globalService: GlobalService,
    private readonly _pageMenuService: PageMenuService,
    private readonly _menuService: MenuService) {
    this._globalService.subscribe('menu.isCollapsed', (menuCollapsed: boolean) => {
      this.menuCollapsed = menuCollapsed;
    });
  }

  ngOnInit(): void {
    this.menuOptions();
  }

  menuOptions(): void {
    /* for (const [key, value] of Object.entries(this._pageMenuService.defaults)) {
      (this._pageMenuService.defaults as any)[key] = false;
    } */
    this._pageMenuService.menus = this._pageMenuService.GET_MENUS();
    this._menuService.updateMenuByRoutes(<Routes>this._pageMenuService.menus);
  }
}
