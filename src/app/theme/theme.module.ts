import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { NgAdditionalsComponent } from "./components/ng-additionals/ng-additionals.component";
import { NgHeadersComponent } from './components/ng-headers/ng-headers.component';
import { NgSidenavComponent } from "./components/ng-sidenav/ng-sidenav.component";
import { NgContentTopComponent } from './components/ng-content-top/ng-content-top.component';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

const NG_COMPONENTS: Array<any> = [
  NgHeadersComponent,
  NgSidenavComponent,
  NgAdditionalsComponent,
  NgContentTopComponent
];

@NgModule({
  declarations: [
    ...NG_COMPONENTS,
    NgContentTopComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    ...NG_COMPONENTS
  ]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule
    };
  }
}
