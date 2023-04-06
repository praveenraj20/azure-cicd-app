import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContractsComponent } from "./contracts.component";
import { OnboardingComponent } from "./onboarding/onboarding.component";

const routes: Routes = [
  { path: '', component: ContractsComponent },
  { path: 'onboarding', component: OnboardingComponent }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
