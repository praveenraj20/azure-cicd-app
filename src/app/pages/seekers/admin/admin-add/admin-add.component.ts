import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { addDays, subYears } from 'date-fns';
import * as _ from 'lodash';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { filter, first, forkJoin, map } from 'rxjs';
import { HiringPriority, OwnerSkillDomain, OwnerSkillLevel, OwnerSkillRoles, OwnerSkillTechnologies, SeekerAdmin, SeekerRequirement, SkillSeeker, SkillSeekerProject, SkillSeekerTechnologyData } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { einRegex, emailRegex, phoneRegex } from 'src/app/core/constants/constant';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { ProfileService } from 'src/app/pages/profile/profile.service';
import { SeekersService } from '../../seekers.service';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss']
})
export class AdminAddComponent implements OnInit {
  visible: 'new' | 'preview' | 'edit' = 'new';
  id!: number;
  tabs: string[] = ['Basic Details', 'Projects', 'Requirements'];
  _tabSelection: number = 0;
  formOne!: FormGroup;
  technologies: OwnerSkillTechnologies[] = [];
  roles: OwnerSkillRoles[] = [];
  levels: OwnerSkillLevel[] = [];
  domains: OwnerSkillDomain[] = [];
  priorities: HiringPriority[] = [];
  seekers: SeekerAdmin[] = [];
  _states: { state_name: string }[] = [];
  _cities: any[] = [];
  status: string[] = ['Active', 'Inactive'];
  seekerInfo!: SkillSeeker;
  projects: SkillSeekerProject[] = [];
  _projects: FormGroup[] = [];
  bsConfig: Partial<BsDatepickerConfig> = { isAnimated: true, dateInputFormat: 'MM/DD/YYYY', containerClass: 'theme-dark-blue' };
  min: Date = subYears(new Date(), 5);
  readonly quillConfigs = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', { 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }]
    ]
  };

  projectTechnologies: any[][] = [];
  __technologies: { [key: string]: OwnerSkillTechnologies } = {};
  __roles: { [key: string]: OwnerSkillRoles } = {};
  __levels: { [key: string]: OwnerSkillLevel } = {};
  _requirements: FormGroup[] = [];
  requirements: SeekerRequirement[] = [];
  requirementProjects: any[][] = [];
  requirementRatings: any[][] = [];
  _requirementRating: any[] = [];
  // experience: string[] = ['0', '0', '1', '2', '3', '4', '5', '6', '7','8','9','10' '11+', '15+'];
  experienceYears: any = {
    fresher: [0],
    junior: ['0+', '1+', '2+'],
    mid: ['3+', '4+', '5+', '6+'],
    senior: ['7+', '8+', '9+', '11+', '15+'],
    '': [],
  };
  experience: number[] = Array(15).fill('').map((e, i) => (i + 1));
  months: number[] = Array(11).fill('').map((e, i) => (i + 1));
  locations: string[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly _service: SeekersService,
    private readonly _appService: AppService,
    private readonly _profileService: ProfileService,
    private readonly _authService: AuthenticationService,
    private readonly currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.defaultsInit();

    this.route.queryParams
      .pipe(
        filter(e => !!e && !!e?.type && !!e?.id),
        first()
      ).subscribe((e) => {
        this.visible = e?.type;
        this.id = parseInt(e?.id);
        this.getSeekerInfo(this.id)
          .then(async () => {
            await this.getProjectsInfo(this.id);
            await this.getRequirementInfo(this.id);
          });
      });
  }

  defaultsInit(): void {
    this.formOne = this.fb.group({
      'businessName': [null, [Validators.required]],
      'businessDomain': [null, [Validators.required]],
      'businessEmail': [null, [Validators.required, Validators.pattern(emailRegex)]],
      'businessPhone': [null, [Validators.required, Validators.pattern(phoneRegex)]],
      'firstName': [null, [Validators.required]],
      'lastName': [null, [Validators.required]],
      'licenseNumber': [null, [Validators.required, Validators.pattern(einRegex)]],
      'address': [null, [Validators.required]],
      '_address': [null, []],
      'state': [null, [Validators.required]],
      'city': [null, [Validators.required]],
      'zipCode': [null, [Validators.required]],
      'phoneNumber': [null, [Validators.required, Validators.pattern(phoneRegex)]],
      'email': [null, [Validators.required, Validators.pattern(emailRegex)]],
      '_phoneNumber': [null, [Validators.pattern(phoneRegex)]],
      '_email': [null, [Validators.pattern(emailRegex)]],
      'status': [null, [Validators.required]],
    });

    this.getDomains();
    this.getTechnologies();
    this.getRoles();
    this.getLevels();
    this.getStates();
    this.getPriorities();
    this.getSeekers();

    this._projects.push(this.createProject());
    this._requirements.push(this.createRequirement());
  }

  saveBasicInfo(): void {
    if (!this.formOne?.valid) return;

    const { value } = this.formOne;

    const info: SkillSeeker = {
      ...(this.visible === 'edit') && { id: this.seekerInfo?.id },
      skillSeekerName: value?.businessName,
      ownerSkillDomainEntity: {
        domainId: value?.businessDomain,
      },
      primaryContactFullName: `${value?.firstName} ${value?.lastName}`,
      taxIdBusinessLicense: value?.licenseNumber,
      addressLine1: value?.address,
      addressLine2: value._address ?? null,
      state: value?.state,
      city: value?.city,
      zipCode: value?.zipCode,
      phone: value?.businessPhone,
      email: value?.email,
      primaryContactPhone: value?.phoneNumber,
      primaryContactEmail: value?.businessEmail,
      secondaryContactEmail: value?._phoneNumber,
      secondaryContactPhone: value?._email,
      addedByAdmin: true,
      status: value?.status ?? 'Active',
      active: value?.status == 'Active'? true : false,
    };

    const j = [];
    this.visible === 'edit'
      ? j.push(this._service.updateSeeker(info))
      : this.visible === 'new'
        ? j.push(this._service.addSeeker(info)) : null;

    if (j.length === 0) return;

    forkJoin(j)
      .subscribe(async ([a]) => {
        this.seekerInfo = a as SkillSeeker;
        this._appService.toastr(this.visible === 'new' ? 'Basic details added successfully' : 'Basic details updated successfully', { icon: 'success' });
        this.getSeekerInfo((a as SkillSeeker)?.id as number, this.visible === 'new');
        if (this.visible === 'new') {
          const id = (a as SkillSeeker)?.id as number;
          await this.getProjectsInfo(id);
          await this.getRequirementInfo(id);
        }
      }, (err) => this._appService.toastr(err));
  }

  saveProjectInfo(): void {
    const m = this._projects.filter(e => e?.valid) ?? [];
    const n: any[] = [];

    m?.forEach((e, i) => {
      const { value } = e;
      const k = this.projectTechnologies[i];
      let c: SkillSeekerProject = {
        skillSeeker: { id: value?.seekerName as number ?? null, },
        ownerSkillDomainEntity: { domainId: parseInt(value?.domain) ?? null },
        title: value?.title ?? null,
        summary: value?.summary ?? null,
        primaryContactEmail: value?.email ?? '',
        primaryContactPhone: value?.phoneNumber ?? '',
        secondaryContactEmail: value?._email ?? null,
        secondaryContactPhone: value?._phoneNumber ?? null,
        startDate: value?.startDate ?? null,
        endDate: value?.endDate ?? null,
        skillSeekerTechnologyData: k?.map((n) => {
          return {
            ownerSkillTechnologiesEntity: { technologyId: n?.technology ?? null },
            ownerSkillRolesEntity: { rolesId: n?.role ?? null },
            ownerSkillLevelEntity: { skillSetLevelId: n?.level ?? null },
            baseRate: parseFloat(n?.baseRate) || null,
            maxRate: parseFloat(n?.maxRate) || null,
            expiresOn: n?.expiry ?? null,
            status: 'Active',
          };
        }) as SkillSeekerTechnologyData[] ?? [],
      };
      n.push(c);
    });

    if (n.length === 0) return;

    this._service.addProjects(n)
      .subscribe((j) => {
        this._appService.toastr(this.visible === 'new' ? 'Project details added successfully' : 'Project details updated successfully', { icon: 'success' });
        this.navigate('/seekers'); //Due to the data issue, we are navigating back.
      }, (err) => this._appService.toastr(err));
  }

  saveRequirementInfo(): void {
    const c = this._requirementRating.length === 0 ? false : this._requirementRating.every((ele) => ele !== null);
    if (!c) return alert('Please select the valid project & rate card');

    const m = this._requirements.filter(e => e?.valid) ?? [];
    const n: any[] = [];

    m?.forEach((ele: any, i: number) => {
      let id = 0;
      for (let i = 0; i <= 11; i++) {
        if (ele?.experienceyear === this.experience[i]) {
          i += 1;
          id = i;
        }
      }
      let c: SeekerRequirement = {
        skillSeeker: { id: parseInt(ele?.skillSeeker) },
        skillSeekerProjectEntity: { id: parseInt(ele?.project) },
        jobTitle: ele?.jobTitle ?? null,
        jobDescription: ele?.jobDescription ?? null,
        jobLocation: ele?.jobLocation ?? null,
        expYears: ele?.expYears?.replace(/[^a-zA-Z0-9 ]/g, '') ?? null,
        // ownerSkillYearOfExperience: { id: id as number },
        status: 'New',
        expMonths: ele?.expMonths ?? null,
        expiryDate: ele?.expiryDate ?? null,
        originalOfPositions: parseInt(ele?.originalPositions) || 0,
        positionsAvailable: parseInt(ele?.positionsAvailable) || 0,
        remote: ele?.remotePercent || 0,
        travel: ele?.travelPercent || 0,
        baseRate: this._requirementRating[i]?.baseRate ?? null,
        maxRate: this._requirementRating[i]?.maxRate ?? null,
        federalSecurityClearance: ele?.federalSecurityClearance ?? true,
        screeningQuestions: ele?.screeningQuestions ?? false,
        hiringPriority: { id: ele?.hiringPriority ?? null },
        coreTechnology: ele?.coreTechnology ?? null,
      };
      n.push(c);
    });

    this._service.insertRequirementDetailsData(n)
      .subscribe(() => {
        this._appService.toastr(this.visible === 'new' ? 'Requirement details added successfully' : 'Requirement details updated successfully', { icon: 'success' });
      }, (error) => {
        this._appService.toastr(error);
      });
  }

  createProject(ii?: SkillSeekerProject): FormGroup {
    const j = this.fb.group({
      id: [ii?.skillSeeker?.id ?? null],
      seekerName: [ii?.skillSeeker?.skillSeekerName ?? null, Validators.required],
      domain: [ii?.ownerSkillDomainEntity?.domainId ?? null, Validators.required],
      startDate: [ii?.startDate ? new Date(ii?.startDate) : null ?? null, Validators.required],
      endDate: [ii?.endDate ? new Date(ii?.endDate) : null ?? null, Validators.required],
      title: [ii?.title ?? null, Validators.required],
      summary: [ii?.summary ?? null],
      /** Optional parameters for the subgroups  */
      technology: [null],
      role: [null],
      level: [null],
      baseRate: [null],
      maxRate: [null],
      expiry: [null],
      _minDate: [ii?.startDate ? addDays(new Date(ii?.startDate), 30) : null ?? null],
      email: [ii?.primaryContactEmail ?? null, [Validators.required, Validators.pattern(emailRegex)]],
      phoneNumber: [ii?.primaryContactPhone ?? null, [Validators.required, Validators.pattern(phoneRegex)]],
      _phoneNumber: [ii?.secondaryContactPhone ?? null, [Validators.pattern(phoneRegex)]],
      _email: [ii?.secondaryContactEmail ?? null, [Validators.pattern(emailRegex)]],
    });

    j.valueChanges.subscribe(async () => {
      const { value } = j;
      const a = parseFloat(value?.baseRate) || 0;
      const b = parseFloat(value?.maxRate) || 0;
      const k = j.get('maxRate');
      k?.setErrors(a > b ? { maximum: true } : null);
    });
    this.projectTechnologies[this._projects.length] = [];
    return j;
  };

  addProject(): void {
    this._projects.push(this.createProject());
  }

  deleteProject(i: number): void {
    if (this._projects.length <= 1) return;
    this._projects.splice(i, 1);
    this.projectTechnologies.splice(i, 1);
  }

  projectTechnology(j: FormGroup): FormGroup {
    return this.fb.group({
      technology: [j?.get('technology')?.value ?? null, Validators.compose([Validators.required])],
      role: [j?.get('role')?.value ?? null, Validators.compose([Validators.required])],
      level: [j?.get('level')?.value ?? null, Validators.compose([Validators.required])],
      baseRate: [j?.get('baseRate')?.value ?? null, Validators.compose([Validators.required])],
      maxRate: [j?.get('maxRate')?.value ?? null, Validators.compose([Validators.required])],
      expiry: [j?.get('expiry')?.value ?? null, Validators.compose([Validators.required])],
    });
  }

  startDateSelection(i: number): void {
    const j = this._projects[i];
    const { value } = j;
    j?.controls?.endDate?.setValue(null);
    j?.controls?._minDate?.setValue(addDays(new Date(value?.startDate), 30))
  }

  addTechnology(n: FormGroup, i: number): void {
    const reset = () => {
      n?.patchValue({
        technology: null,
        role: null,
        level: null,
        baseRate: null,
        maxRate: null,
        expiry: null,
        _minDate: null,
      });
    };

    const j = this.projectTechnology(n);
    const { value, valid } = j;
    if (!valid) return;

    this.projectTechnologies[i] ? null : (this.projectTechnologies[i] = []);

    const k = this.projectTechnologies[i]?.findIndex(
      (ele) => ele?.technology == value?.technology && ele?.role == value?.role && ele?.level == value?.level
    ) ?? -1;

    if (k > -1) return alert('Similar kind of technology, role, and level exists in the table.');

    const m = {
      skillSeeker: { id: this.id ? this.id : 411 },
      status: 'Active',
      ...value,
    };
    /** Parse values to integer. */
    ['baseRate', 'maxRate', 'role', 'level', 'technology'].forEach(e => m[e] = parseFloat(m[e]) || 0);

    this.projectTechnologies[i].push(m);
    reset();
  }

  deleteTechnology(i: number, k: number): void {
    this.projectTechnologies[i]?.splice(k, 1);
  }

  createRequirement(ii?: SeekerRequirement, i?: number): FormGroup {
    const j = this.fb.group({
      skillSeeker: [ii?.skillSeeker ?? null, Validators.required],
      project: [{ value: ii?.skillSeekerProjectEntity?.id ?? null, disabled: ii?.skillSeekerProjectEntity?.id ? false : true }, [Validators.required]],
      rateCard: [{ value: ii?.skillSeekerProjectEntity?.skillSeekerTechnologyData?.[0]?.id ?? null, disabled: ii?.skillSeekerProjectEntity?.skillSeekerTechnologyData?.[0]?.id ? true : false }, [Validators.required]],
      jobTitle: [ii?.jobTitle ?? null, Validators.required],
      expYears: [ii?.expYears ?? null, Validators.required],
      expMonths: [ii?.expMonths ?? null, Validators.required],
      originalPositions: [ii?.originalOfPositions ?? null, Validators.required],
      positionsAvailable: [ii?.positionsAvailable ?? null, Validators.required],
      jobLocation: [ii?.jobLocation ?? '', Validators.required],
      expiryDate: [ii?.expiryDate ? new Date(ii?.expiryDate) : '' ?? '', [Validators.required]],
      jobDescription: [ii?.jobDescription ?? ''],
      remote: [true],
      remotePercent: [ii?.remote ?? 10],
      travel: [true],
      travelPercent: [ii?.travel ?? 10],
      coreTechnology: [ii?.coreTechnology, [Validators.required]],
      hiringPriority: [ii?.hiringPriority?.id ?? null, [Validators.required]],
      federalSecurityClearance: [ii?.federalSecurityClearance ?? false],
      screeningQuestions: [ii?.screeningQuestions ?? false],
      experienceSelection: [''],
    });

    i && i > -1 && ii?.skillSeekerProjectEntity?.id ?
      this.requirementProjectSelection(({ target: { value: ii?.skillSeekerProjectEntity?.id } }) as any, i) : null;

    j?.valueChanges?.subscribe(async () => {
      const { value } = j;
      const a = parseInt(value?.originalPositions) || 0;
      const b = parseInt(value?.positionsAvailable) || 0;
      const k = j.get('positionsAvailable');
      if (!value?.positionsAvailable) {
        k?.setErrors({ minimum: true });
        return;
      }
      b > a ? k?.setErrors({ maximum: true }) : k?.setErrors(null);
    });

    const location = j?.get('jobLocation');
    location?.valueChanges
      .pipe(map(() => location?.value))
      .subscribe((n) => this.getLocation(n));

    return j;
  }

  deleteRequirement(i: number): void {
    const j = _.cloneDeep(this._requirements[i]);
    this._requirements.splice(i, 1);
    this._appService.toastr(`Requirement '${j?.get('jobTitle')?.value}' is deleted`, { icon: 'success' });
  }

  async seekerSelection(event: Event, i: number) {
    const id = (event?.target as HTMLSelectElement).value;
    await this.getSkillSeekarData(id as any, 0);
    const j = this._requirements[i] ?? null;

    j?.patchValue({
      projectName: null,
      rateCard: null,
      coreTechnology: null,
      experienceSelection: null,
    });

    ['rateCard', 'coreTechnology'].forEach((ele) => j?.get(ele)?.disable());

    this.requirementProjects[i]?.length === 0 ? j?.get('project')?.disable() : j?.get('project')?.enable();
  }

  requirementProjectSelection(event: Event, i: number): void {
    const id = (event?.target as HTMLSelectElement).value;
    const j = this.projects.findIndex((e: any) => e?.id == id) ?? -1;
    this.requirementRatings[i] = this.projects[j]?.skillSeekerTechnologyData ?? [];
    const controller = this._requirements[i];
    this.requirementRatings[i]?.length > 0 ? controller?.get('rateCard')?.enable() : null;
  }

  requirementRateSelection(event: Event, i: number): void {
    const id = (event?.target as HTMLSelectElement).value;
    const j = this.requirementRatings[i]?.findIndex((ele) => ele?.id == id) ?? -1;

    const controls = this._requirements[i] ?? null;
    controls?.patchValue({
      experienceSelection: this.requirementRatings[i][j]?._level?.toLowerCase() ?? '',
      coreTechnology: this.requirementRatings[i][j]?.ownerSkillTechnologiesEntity?.technologyId ?? null,
    });
    !this._requirementRating[i] ? this._requirementRating[i] = [] : null;
    this._requirementRating[i] = this.requirementRatings[i][j] ?? null;
  }

  addRequirement(): void {
    this._requirements.push(this.createRequirement());
  }

  getSkillSeekarData(id: number = 411, i: number = -1): Promise<void> {
    return new Promise((resolve) => {
      this._service.getProjectsInfo(id).subscribe(
        (data: any[]) => {
          data?.forEach((ele) => {
            ele?.skillSeekerTechnologyData?.forEach((j: any) => {
              j._rate = `${j?.ownerSkillTechnologiesEntity?.technologyValues} | ${j?.ownerSkillRolesEntity?.rolesDescription}
              ${j?.ownerSkillLevelEntity?.skillLevelDescription} | ${this.currencyPipe.transform(j?.baseRate, 'USD')}-${this.currencyPipe.transform(
                j?.maxRate,
                'USD'
              )}`;
              j._level = j?.ownerSkillLevelEntity?.skillLevelDescription;
            });
          });
          this.projects = data;
          i > -1 ? (this.requirementProjects[i] = data) : null;
          resolve();
        },
        (error) => {
          i > -1 ? (this.requirementProjects[i] = []) : null;
          resolve();
        }
      );
    });
  }

  getSeekerInfo(id: number, fresh: boolean = false): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!id) return reject();

      this._service.getSeekerInfo(id)
        .subscribe((n) => {
          this.seekerInfo = n;
          if (n?.registrationAccess == true) {
            this.formOne.controls['email'].disable();
            this.formOne.patchValue({
              'email': n?.email ?? null
            })
          } else {
            this.formOne.controls['email'].enable();
            this.formOne.patchValue({
              'email': n?.email ?? null
            })
          }
          const mm = n?.primaryContactFullName?.split(' ') ?? [];
          resolve();
          const ii = () => {
            this.formOne.patchValue({
              'businessName': n?.skillSeekerName ?? null,
              'businessDomain': n?.ownerSkillDomainEntity?.domainId ?? null,
              'businessEmail': n?.primaryContactEmail ?? null,
              'businessPhone': n?.phone ?? null,
              'firstName': mm[0] ?? null,
              'lastName': mm[1] ?? null,
              'licenseNumber': n?.taxIdBusinessLicense ?? null,
              'address': n?.addressLine1 ?? null,
              '_address': n?.addressLine2 ?? null,
              'state': n?.state ?? null,
              'city': n?.city ?? null,
              'zipCode': n?.zipCode ?? null,
              'phoneNumber': n?.primaryContactPhone ?? null,
              'email': n?.email ?? null,
              '_phoneNumber': n?.secondaryContactPhone ?? null,
              '_email': n?.secondaryContactEmail ?? null,
              'status': n?.status ?? null,
            });

            this.getCities(false);

            const nn = this.visible === 'preview' ? this.formOne.controls : { businessName: '', licenseNumber: '' };
            Object.keys(nn).forEach(e => this.formOne.get(e)?.disable());
          }
          !fresh ? ii() : null;
        }, (err) => (this._appService.toastr(err), reject()));
    });
  }

  getProjectsInfo(id: number): Promise<void> {
    return new Promise((resolve) => {
      if (!id) return resolve();

      this._service.getProjectsInfo(id)
        .subscribe(j => {
          this.projects = j ?? [];
          this.projects?.forEach((e, i) => {
            this._projects.unshift(this.createProject(e));
            e?.skillSeekerTechnologyData?.forEach(n => {
              Object.assign(n, {
                _level: n?.ownerSkillLevelEntity?.skillLevelDescription,
                _rate: `${n?.ownerSkillTechnologiesEntity?.technologyValues} | ${n?.ownerSkillRolesEntity?.rolesDescription} ${n?.ownerSkillLevelEntity?.skillLevelDescription} | ${this.currencyPipe.transform(n?.baseRate, 'USD')}-${this.currencyPipe.transform(n?.maxRate, 'USD')}`
              });
              const mm = {
                baseRate: n?.baseRate,
                expiry: new Date(n?.expiresOn as string),
                level: n?.ownerSkillLevelEntity?.skillSetLevelId,
                maxRate: n?.maxRate,
                role: n?.ownerSkillRolesEntity?.rolesId,
                skillSeeker: { id: this.id ? this.id : 411 },
                status: n?.status,
                technology: n?.ownerSkillTechnologiesEntity?.technologyId
              };
              this.projectTechnologies[i].push(mm);
            });
          });
          resolve();
        }, (err) => { resolve() });
    })
  }

  getRequirementInfo(id: number): Promise<void> {
    return new Promise((resolve) => {
      if (!id) return resolve();

      this._service.getJobDetails(id)
        .subscribe((j) => {
          this.requirements = j ?? [];

          const k = _.cloneDeep(this.projects) ?? [];

          this.requirements.forEach((e, i) => {
            this._requirements.unshift(this.createRequirement(e, i));
            this.requirementProjects[i] = k;
            this.requirementRatings[i] = [];
          });
        });
    })
  }


  getDomains(): void {
    this._profileService.getDomains()
      .subscribe((j) => {
        this.domains = j ?? [];
      }, (err) => { });
  }

  getTechnologies(): void {
    this._profileService.getTechnologies()
      .subscribe((j) => {
        this.technologies = j ?? [];
        this.technologies?.forEach(e => this.__technologies[e?.technologyId as number] = e);
      }, (err) => { });
  }

  getRoles(): void {
    this._profileService.getRoles()
      .subscribe((j) => {
        this.roles = j ?? [];
        this.roles?.forEach(e => this.__roles[e?.rolesId as number] = e);
      }, (err) => { });
  }

  getLevels(): void {
    this._profileService.getLevels()
      .subscribe((j) => {
        this.levels = j ?? [];
        this.levels?.forEach(e => this.__levels[e?.skillSetLevelId as number] = e);
      }, (err) => { });
  }

  getStates(): void {
    this._authService.getState()
      .subscribe((j) => {
        this._states = j as any[];
      }, (err) => { });
  }

  getCities(reset: boolean = true): void {
    const { state, city } = this.f1;
    if (!state?.valid) return;
    this._authService.getCityList(state?.value)
      .subscribe((j) => {
        this._cities = j as any[];
        reset ? city?.setValue(null) : null;
      }, (err) => { });
  }

  getPriorities(): void {
    this._service.getHiringPriority()
      .subscribe((j) => {
        this.priorities = j;
      });
  }

  getSeekers(): void {
    this._service.getSeekers()
      .subscribe((j) => {
        this.seekers = j;
      });
  }

  getLocation(text: string) {
    this._service.getLocation(text)
      .subscribe(j => {
        this.locations = j ?? [];
      });
  }

  navigate(url: string): void {
    this.router.navigateByUrl(url);
  }

  tabSelection(i: number): void {
    this._tabSelection = i;
  }

  onlyNumber(e: KeyboardEvent): void {
    this._appService.onlyNumber(e);
  }

  onlyPrice(e: KeyboardEvent): void {
    this._appService.onlyNumber(e, 'price');
  }

  get f1() {
    return this.formOne.controls;
  }

  f2 = (n: FormGroup) => n?.controls;

}
