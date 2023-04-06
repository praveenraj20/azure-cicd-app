import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'ng-headers',
  templateUrl: './ng-headers.component.html',
  styleUrls: ['./ng-headers.component.scss']
})
export class NgHeadersComponent implements OnInit {
  logo: string = 'assets/logo/flexcub-FINAL-version_color-text.svg';
  menuCollapsed: boolean = false;

  constructor(private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.toggleMenu();
  }

  toggleMenu(): void {
    this.menuCollapsed = !this.menuCollapsed;
    this._globalService.notifyDataChanged('menu.isCollapsed', this.menuCollapsed);
  }

}
