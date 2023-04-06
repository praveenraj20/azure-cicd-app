/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { StatementOfWorkControllerService } from './services/statement-of-work-controller.service';
import { SeekerTaskControllerService } from './services/seeker-task-controller.service';
import { SeekerProjectControllerService } from './services/seeker-project-controller.service';
import { SeekerTechnologyControllerService } from './services/seeker-technology-controller.service';
import { SeekerMsaControllerService } from './services/seeker-msa-controller.service';
import { SelectionPhaseControllerService } from './services/selection-phase-controller.service';
import { RegistrationControllerService } from './services/registration-controller.service';
import { PoControllerService } from './services/po-controller.service';
import { NotificationControllerService } from './services/notification-controller.service';
import { InvoiceControllerService } from './services/invoice-controller.service';
import { SkillSeekerControllerService } from './services/skill-seeker-controller.service';
import { SkillPartnerControllerService } from './services/skill-partner-controller.service';
import { SeekerRequirementControllerService } from './services/seeker-requirement-controller.service';
import { SeekerAdminControllerService } from './services/seeker-admin-controller.service';
import { OwnerTimeSheetControllerService } from './services/owner-time-sheet-controller.service';
import { OwnerSkillStatusControllerService } from './services/owner-skill-status-controller.service';
import { OwnerSkillSetControllerService } from './services/owner-skill-set-controller.service';
import { OwnerSkillDomainControllerService } from './services/owner-skill-domain-controller.service';
import { HiringControllerService } from './services/hiring-controller.service';
import { ClientControllerService } from './services/client-controller.service';
import { SkillOwnerControllerService } from './services/skill-owner-controller.service';
import { JobControllerService } from './services/job-controller.service';
import { FileReadingControllerService } from './services/file-reading-controller.service';
import { BaseAndMaxRateControllerService } from './services/base-and-max-rate-controller.service';
import { VisaStatusControllerService } from './services/visa-status-controller.service';
import { SkillSeekerInterviewStagesControllerService } from './services/skill-seeker-interview-stages-controller.service';
import { TalentRecommendationControllerService } from './services/talent-recommendation-controller.service';
import { OwnerSkillTechnologiesControllerService } from './services/owner-skill-technologies-controller.service';
import { OwnerSkillRolesControllerService } from './services/owner-skill-roles-controller.service';
import { OwnerSkillLevelControllerService } from './services/owner-skill-level-controller.service';
import { LocationControllerService } from './services/location-controller.service';
import { OwnerSkillLevelAndExperienceControllerService } from './services/owner-skill-level-and-experience-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    StatementOfWorkControllerService,
    SeekerTaskControllerService,
    SeekerProjectControllerService,
    SeekerTechnologyControllerService,
    SeekerMsaControllerService,
    SelectionPhaseControllerService,
    RegistrationControllerService,
    PoControllerService,
    NotificationControllerService,
    InvoiceControllerService,
    SkillSeekerControllerService,
    SkillPartnerControllerService,
    SeekerRequirementControllerService,
    SeekerAdminControllerService,
    OwnerTimeSheetControllerService,
    OwnerSkillStatusControllerService,
    OwnerSkillSetControllerService,
    OwnerSkillDomainControllerService,
    HiringControllerService,
    ClientControllerService,
    SkillOwnerControllerService,
    JobControllerService,
    FileReadingControllerService,
    BaseAndMaxRateControllerService,
    VisaStatusControllerService,
    SkillSeekerInterviewStagesControllerService,
    TalentRecommendationControllerService,
    OwnerSkillTechnologiesControllerService,
    OwnerSkillRolesControllerService,
    OwnerSkillLevelControllerService,
    LocationControllerService,
    OwnerSkillLevelAndExperienceControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
