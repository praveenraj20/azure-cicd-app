
import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FeatureJobNotificationsComponent } from "./feature-job-notifications/feature-job-notifications.component";
import { NotificationsComponent } from "./notifications.component";

const routes: Routes = [
  { path: '', component: NotificationsComponent },
  { path: 'jobs', component: FeatureJobNotificationsComponent },
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
