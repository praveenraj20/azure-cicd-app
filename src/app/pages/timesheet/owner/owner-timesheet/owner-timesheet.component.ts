import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { addDays, endOfWeek, isBefore, startOfWeek, subDays } from 'date-fns';
import * as _ from 'lodash';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { OwnerTimeSheet, Registration, SkillSeekerProject, SkillSeekerTask, TimeSheetResponse } from 'src/app/api/flexcub-api/models';
import { OwnerTimeSheetControllerService } from 'src/app/api/flexcub-api/services';
import { AppService } from 'src/app/app.service';
import { IProjects, ITasks, ITimesheetMatrix, ITimesheetSelectionDto, IWeekOptions } from 'src/app/core/models';
import { TimesheetService } from '../../timesheet.service';

@Component({
  selector: 'app-owner-timesheet',
  templateUrl: './owner-timesheet.component.html',
  styleUrls: ['./owner-timesheet.component.scss'],
  providers: [DatePipe],
})
export class OwnerTimesheetComponent implements OnInit {
  step: number = 1;
  startDate: any;
  endDate: any;
  projects: IProjects[] = [];
  timesheetAccess: boolean = false;
  tasks: { [key: number]: SkillSeekerTask[] } = [];
  selections: ITimesheetSelectionDto = { project: 0, task: 0, timeSheetId: 0 };
  weekEnd: boolean = false;
  weekOptions: IWeekOptions[] = [
    { day: 'Sun', id: 0, date: '', weekEnd: true },
    { day: 'Mon', id: 1, date: '', weekEnd: false },
    { day: 'Tue', id: 2, date: '', weekEnd: false },
    { day: 'Wed', id: 3, date: '', weekEnd: false },
    { day: 'Thu', id: 4, date: '', weekEnd: false },
    { day: 'Fri', id: 5, date: '', weekEnd: false },
    { day: 'Sat', id: 6, date: '', weekEnd: true },
  ];
  durations: ITimesheetMatrix[] = [
    { duration: 0, weekEnd: true },
    { duration: 0, weekEnd: false },
    { duration: 0, weekEnd: false },
    { duration: 0, weekEnd: false },
    { duration: 0, weekEnd: false },
    { duration: 0, weekEnd: false },
    { duration: 0, weekEnd: true },
  ];
  total: ITimesheetMatrix[] = [
    { duration: 0, weekEnd: true },
    { duration: 0, weekEnd: false },
    { duration: 0, weekEnd: false },
    { duration: 0, weekEnd: false },
    { duration: 0, weekEnd: false },
    { duration: 0, weekEnd: false },
    { duration: 0, weekEnd: true },
  ];
  dialogConfig = {
    visible: false,
    startDate: '',
    endDate: '',
    type: '',
  };
  user?: Registration;
  bgConfig: Partial<BsDatepickerConfig> = { isAnimated: true, selectWeek: true, dateInputFormat: 'MM/DD/YYYY', containerClass: 'theme-dark-blue' };
  selectedWeek: Date = startOfWeek(new Date(), { weekStartsOn: 0 });
  maxDate: Date = endOfWeek(new Date(), { weekStartsOn: 0 });
  formTaskSelect!: FormGroup;
  formTask!: FormGroup;
  selfTask: boolean = true;
  @ViewChild('fileSelect') _fileSelect!: ElementRef<HTMLInputElement>;
  fileAttachments: File[] = [];
  _createTask: boolean = false;
  projectStartDate!: Date;
  projectEndDate!: Date;

  constructor(
    private readonly _timesheetService: OwnerTimeSheetControllerService,
    private readonly _service: TimesheetService,
    private readonly fb: FormBuilder,
    private readonly _appService: AppService,
    private readonly router: Router,
    private readonly datePipe: DatePipe) {
    this.user = this._appService.user;
  }

  ngOnInit(): void {
    this.timesheetAccess = this.user?.timeSheetAccess as boolean;

    !this.timesheetAccess
      ? this.router.navigate(['/dashboard']).then(() => this._appService.toastr('Timesheet not available'))
      : null;

    (async () => {
      await this.getProjects();
      this.buildWeekOptions();
    })();

    this.formTaskSelect = this.fb.group({
      id: [null, Validators.compose([Validators.required])],
    });

    this.formTask = this.fb.group({
      task: [null, Validators.required],
      description: [null, Validators.compose([])],
    });
  }

  getProjects(): Promise<void> {
    return new Promise((resolve) => {
      const id = this.user?.id;
      if (!id) return resolve();
      this._timesheetService.getProjectDetails({ skillOwnerId: id })
        .subscribe((res: SkillSeekerProject[]) => {
          this.projects = res.map((ele) => {
            this.projectEndDate = new Date(ele?.endDate!);
            this.projectStartDate = new Date(ele?.startDate!);
            const k = {
              id: ele?.id,
              title: ele?.title,
              tasks: [],
              _tasks: ele?.taskData,
              summary: ele?.summary,
              seekerId: ele?.skillSeeker?.id,
              timeSheetId: 0, //Default 0
            };

            this.tasks[ele?.id as number] = [...ele?.taskData as SkillSeekerTask[]] ?? [];
            return k as IProjects;
          });
          resolve();
        },
          (err: HttpErrorResponse) => {
            resolve();
          },
          () => { }
        );
    });
  }

  getTimeSheet(time: string, copy?: boolean): void {
    const j = { weekStartDate: time, ownerId: this._appService.user?.id as number };
    this._timesheetService.getTimeSheet(j)
      .subscribe((res: TimeSheetResponse[]) => {
        this.projects.forEach((n) => (n.tasks = []));
        this.fileAttachments = [];
        res?.forEach((e) => {
          // this.getAttachments(e?.timeSheetId!);
          const i = this.projects.findIndex((ele) => ele?.id === e?.skillSeekerProjectEntityId) ?? -1;
          if (i === -1) return;

          Object.assign(this.projects[i], { timeSheetId: e?.timeSheetId ?? 0, approved: e?.approved ?? false }); //Assigning the timesheet id for the create and update purposes.

          const ii = this.projects[i]?.tasks?.findIndex((ele) => ele?.id === e?.skillSeekerTaskEntityId) ?? 0;
          if (ii > -1) return; //Stopping to avoid the duplicates.

          let total = _.cloneDeep(this.total).map((ele) => {
            return { ...ele, duration: 0 };
          });
          const hrs = e?.hours?.split(',')?.map((n) => parseInt(n) || 0) ?? [0, 0, 0, 0, 0, 0, 0];
          !copy ? hrs.forEach((n, i: number) => (total[i].duration = n)) : null;
          this.projects[i]?.tasks?.push({ title: e?.taskTitle as string, id: e?.skillSeekerTaskEntityId, duration: total, description: e?.taskDescription });
        });
        this.projects.length > 0 ? this.next(4) : null;
      },
        (err: HttpErrorResponse) => {
          this.projects.forEach((n) => (n.tasks = []));
        },
        () => { }
      );
  }

  next(i: number): void {
    this.step = i;
  }

  copyLast(): void {
    const j = subDays(startOfWeek(this.selectedWeek), 7);
    const k = this.datePipe.transform(j, 'YYYY-MM-dd') as string;
    this.getTimeSheet(k, true);
    this.next(4);
  }

  itemSelection(n: IProjects | SkillSeekerTask, type: 'project' | 'task'): void {
    this.selections[type] = type === 'project' ? (n as IProjects)?.id : (n as SkillSeekerTask)?.taskId as number;
  }

  durationChange(event: Event, duration: ITimesheetMatrix, i: number): void {
    const j = parseFloat((event?.target as HTMLInputElement)?.value) || 0;
    const threshold = 20;
    j > threshold ? (alert(`Duration has to be less than or equal to ${20}`), (duration.duration = 0)) : (duration.duration = j);
    // this.total[i].duration += j;
  }

  get taskInfo(): SkillSeekerTask {
    const i = this.tasks[this.selections?.project]?.findIndex((n) => this.selections?.task === n?.taskId);
    return i > -1 ? this.tasks[this.selections?.project][i] : {};
  }

  get _total(): Array<number> {
    const j = [0, 0, 0, 0, 0, 0, 0];
    this.projects.forEach((project) => {
      project?.tasks?.forEach((task: ITasks) => {
        const k = task?.duration ?? [];
        k.forEach((n: any, i: number) => (j[i] += n?.duration ?? 0));
      });
    });
    return j;
  }

  getTotal(value: any[]): number {
    return value?.reduce((j: number, k: number) => j + k, 0) ?? 0;
  }

  createSheet(): void {
    const { project, task } = this.selections;
    const i = this.projects.findIndex((e) => e?.id === project) ?? -1;
    const ii = this.projects[i]?._tasks?.findIndex((e) => e?.taskId === task) ?? -1;
    if (ii === -1) return;

    const duration: ITimesheetMatrix[] = this.total.map((e: ITimesheetMatrix) => {
      return { ...e, duration: 0 };
    });

    const j = this.projects[i]?._tasks?.[ii] ?? null;
    const k = { title: j?.taskTitle, duration: duration, id: j?.taskId, description: j?.taskDescription } as ITasks;

    const kk = this.projects[i]?.tasks?.findIndex((e) => e?.id === k?.id) ?? -1;
    kk === -1 ? this.projects[i]?.tasks?.push(k) : null;
    this.step = 4;
  }

  submitSheet(): void {
    if (new Date(this.startDate) < this.projectStartDate
      && new Date(this.endDate) > this.projectEndDate) {
      this._appService.toastr(`Timesheet can be submitted during Project duration only ${this.datePipe.transform(this.projectStartDate, 'MM/dd/YYYY')}-${this.datePipe.transform(this.projectEndDate, 'MM/dd/YYYY')} `, { icon: 'error' });
      return;
    }
    const j: OwnerTimeSheet[] = [];
    this.projects.forEach((ele) => {
      if (ele?.approved) return;
      const n: OwnerTimeSheet = {
        skillOwnerEntityId: this._appService?.user?.id as number ?? null,
        skillSeekerEntityId: ele?.seekerId,
        skillSeekerProjectEntityId: ele?.id,
        startDate: this._appService.convertTime(startOfWeek(new Date(this.startDate))),
        endDate: this._appService.convertTime(endOfWeek(new Date(this.endDate))),
        efforts: ele?.tasks?.map((n) => {
          return {
            skillSeekerTaskEntity: { id: n?.id },
            hours: n?.duration?.map((o) => (o = o?.duration))?.join(','),
          };
        }),
      };
      j.push(n);
    });

    /** Depricated, and commented for the future reference.  */
    /*
    ele?.timeSheetId > 0 ? (Object.assign(n, { timeSheetId: ele?.timeSheetId }), update.push(n)) : create.push(n)
    const n = [];
    create.length > 0 ? n.push(this._timesheetService.insertTimeSheet({ body: create as any[] })) : null;
    update.length > 0 ? n.push(this._timesheetService.updateTimeSheet({ body: update as any })) : null; */

    this._timesheetService.insertTimeSheet({ body: j as OwnerTimeSheet[] })
      .subscribe((info) => {
        Object.assign(this.dialogConfig, {
          visible: true,
          startDate: startOfWeek(this.selectedWeek)?.toISOString(),
          endDate: endOfWeek(this.selectedWeek)?.toISOString(),
          type: 'success',
        });

        const mm = this.fileAttachments.filter(e => !e?.webkitRelativePath);  //We can not consider index[0] because we have previous files too, hence we have to check for webkitUrl.
        if (mm.length > 0) {
          this._timesheetService.timesheetDocuments({
            timesheetId: info[0]?.timeSheetId as number,
            body: { document: mm[0] }
          }).subscribe((e) => {
            // const i = this.fileAttachments.findIndex(e => !e?.webkitRelativePath) ?? -1;
            // i > -1 ? (this.fileAttachments.splice(i, 1), this.getAttachments(e.timesheetId!)) : null;
          }, (err) => { })
        }
      }, (error) => {
        this._appService.toastr(error);
      });
  }

  buildWeekOptions(): void {
    const date = startOfWeek(this.selectedWeek, { weekStartsOn: 0 });
    const date2 = endOfWeek(this.selectedWeek, { weekStartsOn: 0 });
    this.startDate = this.datePipe.transform(date, 'YYYY-MM-dd');
    this.endDate = this.datePipe.transform(date2, 'YYYY-MM-dd');
    this.weekOptions.forEach((ele, i: number) => {
      ele.date = addDays(date, i);
    });
    this.getTimeSheet(this.startDate);
  }

  weekChange(position: 'next' | 'previous'): void {
    const next = () => {
      const j = addDays(startOfWeek(this.selectedWeek), 7);
      const k = isBefore(j, this.maxDate);

      if (!k) return;
      this.selectedWeek = j;
      this.buildWeekOptions();
    };

    const previous = () => {
      const j = subDays(startOfWeek(this.selectedWeek), 7);
      this.selectedWeek = j;
      this.buildWeekOptions();
    };

    position === 'next' ? next() : position === 'previous' ? previous() : null;
  }

  dateChange(e: Date): void {
    const j = startOfWeek(this.selectedWeek, { weekStartsOn: 0 });;
    const k = isBefore(j, this.maxDate);

    if (!k) return;

    this.buildWeekOptions();
  }

  taskCheck(e: Event): void {
    this._createTask = (e?.target as HTMLInputElement)?.checked ?? false;
    [this.formTaskSelect, this.formTask].forEach(n => n?.reset());
  }

  taskSelection(event: Event): void {
    const j = (event?.target as HTMLInputElement)?.value;
    const i = this.projects[0]?._tasks?.findIndex((n) => j == (n?.taskId as any)) ?? -1;
    if (i === -1) return;

    const k = this.projects[0]?._tasks?.[i] ?? null;
    this.formTaskSelect?.patchValue({
      id: k?.taskId ?? null,
    });
    this.formTaskSelect?.updateValueAndValidity();
  }

  /** For the Skill seeker created tasks. */
  addTask(): void {
    const projectId = this.selections?.project ? this.selections.project : this.projects[0]?.id ?? 0;
    const { value } = this.formTaskSelect;
    const i = this.projects.findIndex((n) => n?.id === projectId) ?? -1;
    if (i === -1) return alert('Unable to find the project to add the task.');

    const ii = this.projects[i]?._tasks?.findIndex((n) => n.taskId == value?.id) ?? -1;
    if (ii === -1) return alert(`Unable to find the task to add.`);

    const kk = this.projects[i].tasks.findIndex((n) => n?.id == value?.id) ?? -1;
    if (kk > -1) return alert(`You aren't allowed the add the task which are available.`);

    const duration: ITimesheetMatrix[] = this.total.map((e: ITimesheetMatrix) => {
      return { ...e, duration: 0 };
    });

    const j = this.projects[i]?._tasks?.[ii] ?? null;
    const k = { title: j?.taskTitle, duration: duration, id: j?.taskId, description: j?.taskDescription } as ITasks;
    this.projects[i]?.tasks?.push(k);

    Object.assign(this.dialogConfig, { visible: false, type: '' });
    this.formTask?.reset();
  }

  createTask(): void {
    const projectId = this.selections?.project ? this.selections.project : this.projects[0]?.id ?? 0;
    const { value } = this.formTask;
    const i = this.projects.findIndex((n) => n?.id === projectId) ?? -1;
    if (i === -1) return alert('Unable to find the project to add the task.');

    const info: SkillSeekerTask = {
      skillSeekerProjectEntity: { id: projectId },
      taskTitle: value?.task ?? null,
      taskDescription: value?.description ?? null
    };
    this._service.createTask([info])
      .subscribe((res) => {
        const task = res[0];
        if (!task) return;

        this.projects[i]._tasks?.push(task);
        this.tasks[projectId]?.push(task);

        const duration: ITimesheetMatrix[] = this.total.map((e: ITimesheetMatrix) => {
          return { ...e, duration: 0 };
        });

        const j = { title: task?.taskTitle, duration: duration, id: task?.taskId, description: task?.taskDescription } as ITasks;
        this.projects[i]?.tasks?.push(j);

        Object.assign(this.dialogConfig, { visible: false, type: '' });
        this.formTask?.reset();
      }, (err) => this._appService.toastr(err));
  }

  fileSelection(): void {
    this._fileSelect?.nativeElement?.click();
    this._fileSelect.nativeElement.onchange = (e: Event) => {
      const files = (e?.target as HTMLInputElement)?.files ?? [];
      if (files.length === 0) return;
      this.fileAttachments = []
      const threshold = (1024 * 1024) * 1;
      const file = files[0];
      if (file.size > threshold) return this._appService.toastr('File size has to be less than 1Mb');

      const i = this.fileAttachments.findIndex(e => e.name === file.name) ?? -1;
      if (i > -1) return this._appService.toastr('File exists in the bucket.');

      this.fileAttachments.push(file);
    };
  }

  deleteAttachment(i: number): void {
    this.fileAttachments.splice(i, 1);
  }

  //  getAttachments(id: number): void {
  //     this._timesheetService.urlDownloadTimesheetDocuments({ id: id })
  //       .subscribe((j) => {
  //         const k = {
  //           name: j?.fileName, size: j?.size,
  //           lastModified: 1664008613761,
  //           lastModifiedDate: '',
  //           webkitRelativePath: j?.fileDownloadUri,
  //         };
  //         this.fileAttachments.push(k as any);
  //       }, (err: HttpErrorResponse) => {

  //       });
  //   }

  onlyDuration(event: KeyboardEvent): void {
    this._appService.onlyNumber(event, 'price');
  }
}
