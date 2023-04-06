import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JobsComponent } from "./jobs.component";

const routes: Routes = [
  { path: '', component: JobsComponent },
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
