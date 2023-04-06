import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddComponent } from "./add/add.component";
import { SeekersComponent } from "./seekers.component";

const routes: Routes = [
  { path: '', component: SeekersComponent },
  { path: 'add', component: AddComponent }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
