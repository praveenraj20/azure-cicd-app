import { NgModule,  } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TalentsComponent } from './talents.component';
import { routing } from './talents.routing';
import { AddComponent } from './add/add.component';
import { PartnerAddComponent } from './partner/partner-add/partner-add.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



@NgModule({
  declarations: [
    TalentsComponent,
    AddComponent,
    PartnerAddComponent
  ],
  imports: [
    CommonModule,
    routing,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    DatePipe
  ]
})
export class TalentsModule { }
