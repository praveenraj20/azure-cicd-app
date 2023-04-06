
import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeesComponent } from "./employees/employees.component";
import { HistoryComponent } from "./history/history.component";

const routes: Routes = [
  { path: '', component: EmployeesComponent },
  { path: 'history', component: HistoryComponent },
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
