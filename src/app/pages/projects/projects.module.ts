import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { routing } from './projects.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TaskComponent } from './task/task.component';



@NgModule({
  declarations: [
    ProjectsComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    routing,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [DatePipe],

})
export class ProjectsModule { }
