import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TimesheetComponent } from "./timesheet.component";

const routes: Routes = [
  { path: '', component: TimesheetComponent }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
