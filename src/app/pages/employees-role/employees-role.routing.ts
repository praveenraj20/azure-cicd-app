import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EmployeesRoleComponent } from './employees-role.component';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'add', component: AddComponent },
  { path: 'list', component: EmployeesRoleComponent },
  { path: 'map', component: MapComponent },
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
