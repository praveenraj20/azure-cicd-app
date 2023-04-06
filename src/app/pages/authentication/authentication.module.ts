import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MaterialModule } from 'src/app/material.module';
import { routing } from './authentication.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './feature-login/admin-login/admin-login.component';
import { OwnerComponent } from './feature-register/owner/owner.component';
import { SeekerComponent } from './feature-register/seeker/seeker.component';
import { PartnerComponent } from './feature-register/partner/partner.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ActivationComponent } from './feature-register/activation/activation.component';
import { ConfirmActivationComponent } from './feature-register/confirm-activation/confirm-activation.component';


@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AdminLoginComponent,
    OwnerComponent,
    SeekerComponent,
    PartnerComponent,
    ActivationComponent,
    ConfirmActivationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    routing,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    DatePipe
  ]
})
export class AuthenticationModule { }
