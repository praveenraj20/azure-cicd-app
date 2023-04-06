import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, first } from 'rxjs';
import { OwnerSkillDomain, Registration, SkillSeekerProject, SkillSeekerTask } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  today = new Date();
  listOfStatus = ['PO In-Progress', 'SOW In-Progress', 'MSA In-Progress', 'On-Boarded', 'Active', 'In-Active', 'On-Hold'];
  dialogConfig: string = '';
  user!: Registration;
  seekerId!: number;
  projectName!: SkillSeekerProject[];
  departmentData!: OwnerSkillDomain[];
  projectDesc!: SkillSeekerTask[];
  projectTitle!: SkillSeekerTask[];
  taskinfo!: SkillSeekerTask[];
  taskForm!: FormGroup;
  taskNumber!: number;
  skillSeekerId!: number;
  updatetaskForm: FormGroup;

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly formBuilder: FormBuilder,
    private readonly _appService: AppService,
    private activateRoute: ActivatedRoute,
  ) {
    this.user = this._appService.user;
    this.skillSeekerId = this.user?.id as number;
    this.taskForm = this.formBuilder.group({
      'ProjectDepartment1': ['', [Validators.required]],
      'TaskTitle': ['', [Validators.required]],
      'taskDescription': ['', [Validators.required]],
    });
    this.updatetaskForm = this.formBuilder.group({
      'TaskTitle': ['', [Validators.required]],
      'taskDescription': ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.viewProject();
   this.seekerId = this.user?.id!;
  }

  viewProject() {
    this.activateRoute.queryParams
      .pipe(
        filter((param: Params) => !!param && !!param?.projectId),
        first()
      )
      .subscribe((param: Params) => {
        this.projectsService.getSeekerProjectDetails(this.skillSeekerId).subscribe((response) => {
          var data = response;
          this.projectName = response;
          console.log(this.projectName);
          var selectedProject = data.find((x) => x.id == param?.projectId);
          if (selectedProject) {
            this.taskForm.get('ProjectDepartment1')?.patchValue(selectedProject);
            this.projectChange();
          }
        });
      });
  }

  createTask() {
    var array1 = [];
    var request: SkillSeekerTask = {
      skillSeekerProjectEntity: {
        id: this.taskForm.get('ProjectDepartment1')?.value.id,
      },
      taskTitle: this.taskForm.value.TaskTitle,
      taskDescription: this.taskForm.value.taskDescription,
      skillSeekerId: this.seekerId,
    
    };
    array1.push(request);

    this.projectsService.insertSeekerTaskDetails(array1).subscribe(
      (res) => {
        this._appService.toastr('Task has been created successfully', { icon: 'success' });
        this.taskinfo = [];
        this.projectsService.seekerTaskDetails(this.taskForm.value.ProjectDepartment1.id, this.seekerId).subscribe((res) => {
          this.taskinfo = res;
          this.taskinfo = this.taskinfo.sort((a, b) => {
            return b.taskId! - a.taskId!;
          });
        });
      },
      (err) => this._appService.toastr(err));
  }

  projectChange() {
    var data = this.taskForm.get('ProjectDepartment1')?.value;
    this.projectTitle = this.taskForm.get('ProjectDepartment1')?.value.title;
    this.projectDesc = this.taskForm.get('ProjectDepartment1')?.value?.summary?.replace(/<(?:.|\n)*?>/gm, ' ') ?? '';
    this.projectsService.seekerTaskDetails(data.id, this.skillSeekerId).subscribe((res) => {
      this.taskinfo = res;
      this.taskinfo = this.taskinfo.sort((a,b) => {
        return b.taskId! - a.taskId!;
      });
    });
  }

  updateTask() {
    var request = {
      taskId: this.taskNumber,
      skillSeekerProjectEntity: {
        id: this.taskForm.value.ProjectDepartment1.id,
      },
      taskTitle: this.updatetaskForm.value.TaskTitle,
      taskDescription: this.updatetaskForm.value.taskDescription,
      skillSeeker: {
        id: this.seekerId,
      },
    };

    this.projectsService.updateSeekerTaskDetails(request).subscribe(
      (res) => {
        this._appService.toastr('Task has been updated successfully', { icon: 'success' });
        this.dialogConfig = '';
        this.taskinfo = [];
        this.projectsService.seekerTaskDetails(this.taskForm.value.ProjectDepartment1.id, this.seekerId).subscribe((res) => {
          this.taskinfo = res;
          this.taskinfo = this.taskinfo.sort((a,b) => {
            return b.taskId! - a.taskId!;
          });
        });
      },
      (err) => this._appService.toastr(err));
  }

  open(list: any) {
    this.dialogConfig = 'rateCard';
    this.updatetaskForm.get('TaskTitle')?.patchValue(`${list.taskTitle}`);
    this.updatetaskForm.get('taskDescription')?.patchValue(`${list.taskDescription}`);
    this.taskNumber = list.taskId;
  }

  async deleteTask(id: number) {
    var result = await this._appService.confirmation('Are you sure?', "You won't be able to revert this!", { showCancelButton: true })
    if (result) {
      this.projectsService.deleteSeekerTaskDetails(id).subscribe(
        (res) => {
          this._appService.toastr('Your file has been deleted successfully', { icon: 'success' });
          this.taskinfo = [];
          this.projectsService.seekerTaskDetails(this.taskForm.value.ProjectDepartment1.id, this.seekerId).subscribe((res) => {
            this.taskinfo = res;
            this.taskinfo = this.taskinfo.sort((a,b) => {
              return b.taskId! - a.taskId!;
            });
          });
        },
        (err) => this._appService.toastr(err));
    }
  }
}