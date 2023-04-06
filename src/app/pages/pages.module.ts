import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { routing } from './pages.routing';
import { MaterialModule } from '../material.module';
import { ThemeModule } from '../theme/theme.module';



@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    routing,
    MaterialModule
  ]
})
export class PagesModule { }
