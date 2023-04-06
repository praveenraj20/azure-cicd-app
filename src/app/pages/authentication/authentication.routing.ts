import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminLoginComponent } from "./feature-login/admin-login/admin-login.component";
import { ActivationComponent } from "./feature-register/activation/activation.component";
import { ConfirmActivationComponent } from "./feature-register/confirm-activation/confirm-activation.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'login-admin', component:AdminLoginComponent},
  { path: 'activate', component: ActivationComponent },
  { path: 'activation', component: ConfirmActivationComponent },
  { path: '', redirectTo: '/login' }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
