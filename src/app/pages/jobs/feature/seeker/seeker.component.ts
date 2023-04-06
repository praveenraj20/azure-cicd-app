import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { HiringPriority, JobDto, OwnerSkillDomain, OwnerSkillTechnologies, OwnerSkillTechnologiesEntity, OwnerSkillYearOfExperience, Registration, SkillSeekerProject, } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { Remote, Travel } from 'src/app/core/models/skill-seeker.model';
import { JobsService } from '../../jobs.service';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss'],
})
export class SeekerComponent implements OnInit, AfterViewInit {
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  step: number = 1;
  maxEditorTextLength: number = 500;
  currentEditorTextLength: number = 0;
  jobs: MatTableDataSource<JobDto> = new MatTableDataSource<JobDto>([]);
  $jobs!: Observable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  user: Registration;
  form!: FormGroup;
  technologies: OwnerSkillTechnologies[] = [];
  domainList!: OwnerSkillDomain[];
  projectname: string = '';
  projectName!: SkillSeekerProject[];
  streets!: string[];
  levels!: levelExperience[];
  selected!: string;
  activeButton!: string;
  activeButtons!: string;
  active!: string;
  role!: string;
  selectedDomain:number=9;
  selectedProject:number=0;
  condition: boolean = true;
  condition1: boolean = true;
  levelExperience!: {}[][];
  Experience: string[] = [
    '0',
    '0+',
    '1+',
    '2+',
    '3+',
    '4+',
    '5+',
    '6+',
    '7+',
    '9+',
    '11+',
    '15+',
  ];
  id1: number = 0;
  skills: string[] = [];
  _skills: any[] = [];
  isLoading!: boolean;
  locations = new FormControl('', Validators.required);
  states: string[] = [];
  filteredOptions!: Observable<string[]>;
  addressData!: string[];
  hiringPriority: HiringPriority[] = [];
  id3!: number;
  data!: string[];
  counter: number = 1;
  remote: boolean = false;
  travel: boolean = false;
  remoteValue: number = 0;
  travelValue: number = 0;
  options: Options = {
    floor: 0,
    step: 5,
    ceil: 100,
  };
  travels: Travel[] = [
    { value: 'yes', viewValue: 'Yes' },
    { value: 'no', viewValue: 'No' },
  ];
  remotes: Remote[] = [
    { value: 'yes', viewValue: 'Yes' },
    { value: 'no', viewValue: 'No' },
  ];
  checkedvalue: boolean = false;
  checkedvalue1: boolean = false;
  checked: string = 'DISABLE';
  checked1: string = 'NOT REQUIRED';
  TechnologyList!: OwnerSkillTechnologies[];
  baseRate: number = 50;
  maxRate: number = 120;
  fixedskills: string[] = [];
  extraskills: string[] = [];
  skillSetValue: string[] = [];
  show: boolean = false;
  array!: OwnerSkillTechnologiesEntity[];
  taxId: string;
  jobid!: string;
  searchEntry: string = '';
  options2: Options = {
    floor: 0,
    ceil: 200,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '$' + value;
        case LabelType.High:
          return '$' + value;
        default:
          return '' + value;
      }
    },
  };
  quillConfigs = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', { color: [] }, { background: [] }],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
    ],
  };

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly jobsService: JobsService,
    private cdr: ChangeDetectorRef,
    private readonly _appService: AppService,
    private readonly router: Router) {
    this.user = this._appService.user;
    this.taxId = this.user?.taxIdBusinessLicense as string;

  }

  ngOnInit(): void {
    this.$jobs = this.jobs?.connect();

    this.form = this.formBuilder.group({
      jobtitle: ['', [Validators.required]],
      location: ['', [Validators.required]],
      technology: ['', [Validators.required]],
      richText: ['', [Validators.required]],
      skills: [null, [Validators.required]],
      skillSet: ['', [Validators.required]],
      department: ['', [Validators.required]],
      project: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      _level: ['', [Validators.required]],
      level: ['', [Validators.required]],
      counter: ['', [Validators.required]],
      remotePercent: ['', [Validators.required]],
      travel: [false],
      remote: [false],
      travelPercent: ['', Validators.required],
    });

    this.getRetrieveJob();
    this.getTechnologyList();
    this.getDomainList();
    this.getSeekerProjectDetails();
    this.getOwnerSkillYearOfExperienceDetails();
    this.getHiringPriority();
    this.filteredOptions = this.locations.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  ngAfterViewInit(): void {
    this.jobs.paginator = this.paginator;
  }

  private _filter(value: string): string[] {
    this.isLoading = true;
    this.jobsService.getLocation(value).subscribe((response) => {
      this.isLoading = false;
      this.addressData = response;
    });
    return this.addressData;
  }

  progress(id: number) {
    this.router.navigate(['/process/progress'], {
      queryParams: { jobId: id },
    });
  }

  suggestions(id: number) {
    this.router.navigate(['/process/suggestions'], {
      queryParams: { jobId: id },
    });
  }

  submit() {
    this.show = true;
    this.jobsService.getTechnologyList().subscribe((response) => {
      this.TechnologyList = response;
      for (let j = 0; j < this.fixedskills.length; j++) {
        for (let i = 0; i < this.TechnologyList.length; i++) {
          if (this.fixedskills[j] === this.TechnologyList[i].technologyValues) {
            var request = {
              technologyId: this.TechnologyList[i].technologyId,
            };
            this.array.push(request);
          }
        }
      }
    });

        let request1: JobDto = {
          jobTitle: this.form.value.jobtitle,
          jobLocation: this.locations.value,
          screeningQuestions: this.checkedvalue,
          ownerSkillTechnologiesEntity: this.array,
          jobDescription: this.form.value.richText.replace(/<[^>]*>/g, ''),
          ownerSkillYearOfExperience: {
            id: this.id1,
          },
          project: this.projectname ?? '',
          seekerProject: {
            id: this.form.value.project,
            ownerSkillDomainEntity: {
              domainId: this.form.value.department,
            },
          },
          hiringPriority: {
            id: this.id3,
          },
          ownerSkillDomainEntity: {
            domainId: this.form.value.department,
          },
          numberOfPositions: this.counter,
          remote: this.form.value.remotePercent,
          travel: this.form.value.travelPercent,
          baseRate: this.baseRate,
          maxRate: this.maxRate,
          federalSecurityClearance: this.checkedvalue1,
          taxIdBusinessLicense: this.taxId,
          status: 'New',
          skillSeeker: {
            id: this.user?.id as number,
          },
          customTech: this.extraskills.toString(),
        };

        this.jobsService.addJobDetails(request1).subscribe(
          (data) => {
            this.jobid = data.jobId as string;
            this.publish();
            this.show = false;
          },
          (err) => this._appService.toastr(err)
        );
  }

  publish() {
    if (this.jobid) {
      this.jobsService.publish(this.jobid).subscribe(
        (response) => {
          this._appService.toastr(
            `${this.form.value.jobtitle} is added successfully`,
            { icon: 'success' }
          );
          this._appService.timeout().then(() => window.location.reload());
        },
        (err) => this._appService.toastr(err)
      );
    }
  }

  next(i: number): void {
    this.step = i;
  }

  EnableDisable(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.checkedvalue = true;
      this.checked = 'ENABLE';
    } else {
      this.checkedvalue = false;
      this.checked = 'DISABLE';
    }
  }

  required(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.checkedvalue1 = true;
      this.checked1 = 'REQUIRED';
    } else {
      this.checkedvalue1 = false;
      this.checked1 = 'NOT REQUIRED';
    }
  }

  formatLabel(value: number) {
    if (value >= 1) {
      return Math.round(value / 1) + '%';
    }
    return value;
  }

  getDomainList(): void {
    this.jobsService.getDomainList().subscribe((response) => {
      this.domainList = response;
    });
  }

  getRetrieveJob() {
    const id = this.user.id as number;
    if (!id) return;
    this.jobsService.getRetrieveJob(id)
      .subscribe((j) => {
        j?.forEach(e => e?.status === 'Active' ? e.status = 'New' : null);
        const _j = j?.sort((a, b) => parseInt(b?.jobId?.slice(4)!) - parseInt(a?.jobId?.slice(4)!));
        this.jobs.data = _j;
      });
  }

  get f() {
    return this.form.controls;
  }

  setActive(name: string) {
    this.role = name;
    this.activeButton = name;
    this.condition = true;
  }

  firstSetActive(name: string) {
    this.activeButtons = name;

    for (let i = 0; i <= 11; i++) {
      if (name === this.Experience[i]) {
        i += 1;
        this.id1 = i;
      }
    }

    this.condition = false;
  }

  secondSetActive(buttonName: string) {
    this.activeButtons = buttonName;
  }

  thirdSetActive(data: HiringPriority) {
    this.condition1 = false;

    this.id3 = data.id as number;
    this.active = data.hiringPriority as string;
  }

  isActive(buttonName: string) {
    this.role = buttonName;
    return this.activeButton === buttonName;
  }

  isActiveFirst(buttonName: string) {
    return this.activeButtons === buttonName;
  }

  isActiveSecond(buttonName: string) {
    return this.active === buttonName;
  }

  isActiveThird(buttonName: string) {
    return this.active === buttonName;
  }

  counterOne() {
    if (this.counter <= 1) {
      this.counter = 1;
    } else {
      this.counter = --this.counter;
    }
  }

  counterTwo() {
    this.counter = ++this.counter;
  }

  listData(x: string) {
    this.selected = x;
  }

  getTechnologyList(): void {
    this.jobsService.getTechnologyList()
      .subscribe((j) => this.technologies = j);
  }

  getSeekerProjectDetails(): void {
    const id = this.user?.id as number;
    this.jobsService.getSeekerProjectDetails(id)
      .subscribe((j) => this.projectName = j);
  }

  getOwnerSkillYearOfExperienceDetails(): void {
    this.jobsService
      .getOwnerSkillYearOfExperienceDetails()
      .subscribe((j) => {
        this.levelExperience = j;
        this.levels = this.levelExperience.map((x: any) => ({
          lvl: x[0],
          exp: x[1].split(','),
        }));
      });
  }

  addSkill(): void {
    const i = this.skills.findIndex((e) => e === this.f?.skills?.value);
    if (i > -1) return this._appService.toastr('Value Already exist', { icon: 'warning', });

    this.skills.push(this.f?.skills?.value);
    const ii = this.technologies.findIndex((e) => this.f?.skills?.value === e?.technologyValues) ?? -1;
    const m = this.technologies[ii] ?? null;
    this._skills.push({
      id: ii > -1 ? m?.technologyId : null,
      label: this.f?.skills?.value,
    });
    this.f?.skills?.setValue(null);
  }

  removeSkill(i: number): void {
    this.skills.splice(i, 1);
  }

  getHiringPriority() {
    this.jobsService.getHiringPriority()
      .subscribe((j) => this.hiringPriority = j);
  }

  get s3() {
    return this.formBuilder.group({
      'jobtitle': this.form.get('jobtitle'),
      'technology': this.form.get('technology'),
      'location': this.locations,
    });
  }

  onlyNumber(e: KeyboardEvent): void {
    this._appService.onlyNumber(e);
  }
}
interface levelExperience {
  lvl: string;
  exp: string[];
}
