import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { TalentsComponent } from './talents.component';

const routes: Routes = [
  // { path: '', component: TalentsComponent },
  { path: 'add', component: AddComponent },
  { path: '', redirectTo: '/add' },
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
