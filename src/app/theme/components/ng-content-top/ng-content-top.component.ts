import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'ng-content-top',
  templateUrl: './ng-content-top.component.html',
  styleUrls: ['./ng-content-top.component.scss']
})
export class NgContentTopComponent implements OnInit {
  title: string = '';

  constructor(private readonly _global: GlobalService) {
    this._global.subscribe('menu.activeLink', (j: string) => {
      j ? this.title = j : null;
    });
  }

  ngOnInit(): void {
  }

}
