import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Registration } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { INavMenus, IRouteMenus, Role } from 'src/app/core/models';
import { GlobalService } from 'src/app/global.service';
import { MenuService } from '../../services/menu.service';
import { defaults, owner, partner, skillseeker, superadmin } from './route-menus';

@Component({
  selector: 'ng-sidenav',
  templateUrl: './ng-sidenav.component.html',
  styleUrls: ['./ng-sidenav.component.scss']
})
export class NgSidenavComponent implements OnInit, OnDestroy {
  menuCollapsed: boolean = false;
  menuShouldCollapse: boolean = false;
  sizes = {
    collapseSideBar: 991,
    hideSideBar: 500
  };
  menuItems: Array<INavMenus> = [];
  user: Registration;
  protected onRouteChange!: Subscription;
  protected menuItemsSub!: Subscription;
  defaults: IRouteMenus[] = defaults;
  partner: IRouteMenus[] = partner;
  owner: IRouteMenus[] = owner;
  superadmin: IRouteMenus[] = superadmin;
  skillseeker: IRouteMenus[] = skillseeker;

  constructor(
    private readonly _globalService: GlobalService,
    private readonly _menuService: MenuService,
    private readonly router: Router,
    private readonly _appService: AppService) {
    this._globalService.subscribe('menu.isCollapsed', (menuCollapsed: boolean) => {
      this.menuCollapsed = menuCollapsed;
    });

    this.user = this._appService.user;
  }

  ngOnInit(): void {
    this.onRouteChange = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.menuItems) {
          this.selectMenuAndNotify();
        } else {
          setTimeout(() => this.selectMenuAndNotify());
        }
      }
    });

    this.menuItemsSub = this._menuService.menuItems.subscribe(this.updateMenu.bind(this));

    if (this._shouldMenuCollapse()) {
      this.menuCollapse();
    }
  }

  updateMenu(newMenuItems: Array<INavMenus>): void {
    this.menuItems = newMenuItems;
    this.selectMenuAndNotify();
  }

  selectMenuAndNotify(): void {
    if (this.menuItems) {
      this.menuItems = this._menuService.selectMenuItem(this.menuItems);
      this._globalService.notifyDataChanged('menu.activeLink', this._menuService.getCurrentItem());
    }
  }

  menuCollapse(): void {
    this.menuCollapseChange(true);
  }

  menuExpand(): void {
    this.menuCollapseChange(false);
  }

  menuCollapseChange(isCollapsed: boolean): void {
    this.menuCollapsed = isCollapsed;
    this._globalService.notifyDataChanged('menu.isCollapsed', this.menuCollapsed);
  }

  _shouldMenuCollapse(): boolean {
    return window.innerWidth <= this.sizes.collapseSideBar;
  }

  @HostListener('window:resize')
  onResize(): void {
    const menuShouldCollapse = this._shouldMenuCollapse();
    if (this.menuCollapsed !== menuShouldCollapse) {
      this.menuCollapseChange(menuShouldCollapse);
    }
    this.menuShouldCollapse = menuShouldCollapse;
  }

  ngOnDestroy(): void {
    this.onRouteChange?.unsubscribe();
    this.menuItemsSub?.unsubscribe();
  }

  get isAdmin() { return this.user && this.user?.roles?.roleDescription === Role.SuperAdmin }

  get isPartner() { return this.user && this.user?.roles?.roleDescription === Role.Partner }

  get isSeeker() { return this.user && this.user?.roles?.roleDescription === Role.Seeker }

  get isOwner() { return this.user && this.user?.roles?.roleDescription === Role.Owner }

  get isSsAdmin() { return this.user && (this.user?.roles?.roleDescription === Role.SsAdmin || this.user?.roles?.roleDescription === Role.SuperAdmin) }

  get isSeekerAdmin() { return this.user && this.user?.subRoles === Role.SeekerAdmin }
}
