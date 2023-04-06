import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isAfter } from 'date-fns';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { OwnerSkillDomain, Registration, SkillSeekerProject, SkillSeekerProjectEntity, TaskList } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  step: number = 1;
  today = new Date();
  form: FormGroup;
  updatetaskForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig> = { isAnimated: true, dateInputFormat: 'MM/DD/YYYY', containerClass: 'theme-dark-blue' };
  domainList!: OwnerSkillDomain[];
  projectDetails: any = [];
  seekerId?: Number;
  user!: Registration;
  projectName!: SkillSeekerProject[];
  skillSeekerId!: number;
  projectId!: number;
  dialogConfig: string = '';
  departmentData!: OwnerSkillDomain[];
  skillSeekerProjectAndTaskList!: TaskList[];
  taskNumber: any;
  disabledDates: any;
  projectForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly projectsService: ProjectsService,
    private readonly router: Router,
    private readonly _appService: AppService,
    private readonly datePipe: DatePipe,

  ) {
    this.user = this._appService.user;
    this.skillSeekerId = this.user?.id as number;
    this.form = this.formBuilder.group({
      'projectTitle': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'department': ['', [Validators.required]],
      'startDate': ['', [Validators.required]],
      'endDate': ['', [Validators.required]],
    });

    this.updatetaskForm = this.formBuilder.group({
      'taskTitle': ['', [Validators.required]],
      'taskDescription': ['', [Validators.required]],
    });

    this.projectForm = this.formBuilder.group({
      'projectTitle': ['', [Validators.required]],
      'projectDescription': ['', [Validators.required]],
      'projectDepartment': ['', [Validators.required]],
      'startDate': ['', [Validators.required]],
      'endDate': ['', [Validators.required]],
    });

    const { startDate, endDate } = this.form.controls;
    startDate?.valueChanges?.subscribe(() => endDate?.setValue(null));
    endDate?.valueChanges?.subscribe(() => {
      const j = startDate.value, k = endDate?.value;
      !isAfter(k, j) ? endDate?.setErrors({ minDate: true }) : null;
    });
  }

  ngOnInit(): void {
    this.seekerId = this.user?.id;
    this.getDomainList();
    this.getSeekerProjectDetails();
    this.getProjectTaskDetailsBySeeker(this.seekerId as number);
    this.getDepartmentData()
  }

  redirectProject(id: number) {
    this.router.navigate(['/projects/task'], { queryParams: { projectId: id } });
  }

  getDepartmentData() {
    this.projectsService.getDepatmentData().subscribe((data) => {
      if (data.length) {
        this.departmentData = data;
      }
    });
  }

  updateTask() {
    var request = {
      taskId: this.taskNumber,
      skillSeekerProjectEntity: {
        id: this.projectId,
      },
      taskTitle: this.updatetaskForm.value.TaskTitle,
      taskDescription: this.updatetaskForm.value.taskDescription,
    };

    this.projectsService.updateSeekerTaskDetails(request).subscribe(
      (res) => {
        this._appService.toastr('Project has been updated successfully', { icon: 'success' });
        this.dialogConfig = '';
        this.projectDetails = [];
        this.getProjectTaskDetailsBySeeker(this.seekerId as number);
      },
      (err) => this._appService.toastr(err));
  }

  next(i: number): void {
    this.step = i;
  }

  get f() { return this.form.controls; }

  getDomainList(): void {
    this.projectsService.getDomainList().subscribe((response) => {
      this.domainList = response;
    });
  }

  getSeekerProjectDetails(): void {
    this.projectsService.getSeekerProjectDetails(this.skillSeekerId).subscribe((response) => {
      this.projectName = response;
    });
  }

  open(list: any, item: any) {
    this.dialogConfig = 'task';
    this.updatetaskForm.get('taskTitle')?.patchValue(`${list.taskTitle}`);
    this.updatetaskForm.get('taskDescription')?.patchValue(`${list.taskDescription}`);
    this.taskNumber = list.taskId;
    this.projectId = item.skillSeekerProjectEntity?.id;
  }

  onBoardingSubmit() {
    if (this.form.invalid) {
      return false;
    }
    var array = [];
    let c = {
      skillSeeker: {
        id: this.seekerId ?? null,
      },
      ownerSkillDomainEntity: { domainId: this.form.get('department')?.value ?? null },
      title: this.form.get('projectTitle')?.value ?? null,
      summary: this.form.get('description')?.value ?? null,
      primaryContactEmail: this.user?.emailId ?? null,
      primaryContactPhone: this.user?.contactPhone ?? null,
      secondaryContactEmail: '',
      secondaryContactPhone: "",
      startDate: this.form.get('startDate')?.value ?? null,
      endDate: this.form.get('endDate')?.value ?? null,
      skillSeekerTechnologyData: null,
    };
    array.push(c);
    this.projectsService.addNewSkillSeekarData(array).subscribe(() => {
      this._appService.toastr('Project has been created successfully', { icon: 'success' });
      this.next(1);
      this.getProjectTaskDetailsBySeeker(this.seekerId as number);
    }, (err) => this._appService.toastr(err));
  }

  getProjectTaskDetailsBySeeker(id: number): void {
    this.projectsService.getProjectTaskDetailsBySeeker(id).subscribe((response) => {
      var data = response.skillSeekerProjectAndTaskList?.map(
        (val, index) =>
        (val['skillSeekerProjectEntity'] = {
          ...val['skillSeekerProjectEntity'],
          summary: val['skillSeekerProjectEntity']?.summary?.replace(/<(?:.|\n)*?>/gm, '') ?? '',
        })
      );
      if (data) {
        this.projectDetails = response.skillSeekerProjectAndTaskList;
        this.projectDetails = this.projectDetails.sort((a: { skillSeekerProjectEntity: { id: number; }; }, b: { skillSeekerProjectEntity: { id: number; }; }) => {
          return b.skillSeekerProjectEntity.id - a.skillSeekerProjectEntity.id;
        });
      }
    });
  }

  async deleteTask(id: number): Promise<void> {
    var result = await this._appService.confirmation('Are you sure?', "You won't be able to revert this!", { showCancelButton: true })
    if (result) {
      this.projectsService.deleteSeekerTaskDetails(id).subscribe(
        (res) => {
          this._appService.toastr('Project has been deleted successfully', { icon: 'success' });
          this.projectDetails = [];
          this.getProjectTaskDetailsBySeeker(this.seekerId as number);
        },
        (err) => this._appService.toastr(err));
    }
  }

  updateProject(list: SkillSeekerProjectEntity) {
    this.projectId = list.id as number;
    this.projectForm.patchValue({
      'projectTitle': list?.title ?? null,
      'projectDescription': list?.summary ?? null,
      'projectDepartment': list?.ownerSkillDomainEntity?.domainId ?? null,
      ...(list?.startDate) && { 'startDate': this.datePipe.transform(`${list?.startDate}`, 'MM-dd-YYYY') },
      ...(list?.endDate) && { 'endDate': this.datePipe.transform(`${list?.endDate}`, 'MM-dd-YYYY') },
    });
  }

  onProjectSubmit() {
    if (this.projectForm.invalid) {
      return false;
    }
    let c = {
      id: this.projectId,
      skillSeeker: {
        id: this.seekerId ?? null,
      },
      ownerSkillDomainEntity: { domainId: this.projectForm.get('projectDepartment')?.value ?? null },
      title: this.projectForm.get('projectTitle')?.value ?? null,
      summary: this.projectForm.get('projectDescription')?.value ?? null,
      primaryContactEmail: this.user?.emailId ?? null,
      primaryContactPhone: this.user?.contactPhone ?? null,
      secondaryContactEmail: '',
      // secondaryContactPhone: null,
      startDate: this.datePipe.transform(this.projectForm.get('startDate')?.value, 'yyyy-MM-dd') ?? null,
      endDate: this.datePipe.transform(this.projectForm.get('endDate')?.value, 'yyyy-MM-dd') ?? null,
      // skillSeekerTechnologyData: null,
    };

    this.projectsService.updateSeekerProjectDetails(c).subscribe(
      (res) => {
        this._appService.toastr('Project has been updated successfully', { icon: 'success' });
        this.projectDetails = [];
        this.getProjectTaskDetailsBySeeker(this.seekerId as number);
        this.dialogConfig = '';
      },
      (err) => this._appService.toastr(err));
  }

  handler() {
    var date = new Date(this.projectForm.get('startDate')?.value);
    date.setDate(date.getDate() + 1);
    this.disabledDates = date;
  }
}

