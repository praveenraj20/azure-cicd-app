import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: 'task', component: TaskComponent }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
