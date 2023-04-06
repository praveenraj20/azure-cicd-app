import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedComponent } from './unauthorized.component';

const routes: Routes = [
  { path: '', component: UnauthorizedComponent }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
