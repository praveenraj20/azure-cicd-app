import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddComponent } from "./add/add.component";

import { PartnersAdminComponent } from "./partners-admin.component";


const routes: Routes = [
  { path: '', component: PartnersAdminComponent },
  { path: 'add', component: AddComponent }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
