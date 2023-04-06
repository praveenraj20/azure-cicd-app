import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ContractsComponent } from './contracts.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { SeekerOnboardingComponent } from './seeker/seeker-onboarding/seeker-onboarding.component';
import { SharedModule } from '../shared';
import { routing } from './contracts.routing';
import { PartnerContractsComponent } from './partner/partner-contracts/partner-contracts.component';
import { SeekerContractsComponent } from './seeker/seeker-contracts/seeker-contracts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from 'src/app/material.module';
import { CoreModule } from 'src/app/core/core.module';
import { PartnerPhasesComponent } from './partner/partner-phases/partner-phases.component';
import { SeekerPhasesComponent } from './seeker/seeker-phases/seeker-phases.component';
import { AdminContractsComponent } from './admin/admin-contracts/admin-contracts.component';



@NgModule({
  declarations: [
    ContractsComponent,
    OnboardingComponent,
    SeekerOnboardingComponent,
    PartnerContractsComponent,
    SeekerContractsComponent,
    PartnerPhasesComponent,
    SeekerPhasesComponent,
    AdminContractsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [
    DatePipe
  ]
})
export class ContractsModule { }
