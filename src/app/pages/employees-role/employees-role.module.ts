import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoleComponent } from './employees-role.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from '../shared';
import { SeekerEmployeeRoleComponent } from './seeker/seeker-employee-role/seeker-employee-role.component';
import { routing } from './employees-role.routing';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AddComponent } from './add/add.component';
import { SeekerAddComponent } from './seeker/seeker-add/seeker-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { SeekerListComponent } from './seeker/seeker-list/seeker-list.component';
import { SeekerMapComponent } from './seeker/seeker-map/seeker-map.component';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    EmployeesRoleComponent,
    SeekerEmployeeRoleComponent,
    AddComponent,
    SeekerAddComponent,
    ListComponent,
    MapComponent,
    SeekerListComponent,
    SeekerMapComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    routing,
    MaterialModule,
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class EmployeesRoleModule { }
