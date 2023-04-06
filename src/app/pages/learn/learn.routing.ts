import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LearnComponent } from "./learn.component";

const routes: Routes = [
  { path: '', component: LearnComponent },
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
