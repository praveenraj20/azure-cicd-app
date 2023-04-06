import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isAfter, isBefore, subYears } from 'date-fns';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { filter, forkJoin, Observable } from 'rxjs';
import { Client, ClientDetails, ClientEntity, OwnerSkillDomain, OwnerSkillLevel, OwnerSkillRoles, OwnerSkillTechnologies, OwnerSkillYearOfExperience, Registration, SkillOwnerDto, SkillOwnerEntity, SkillOwnerGender, SkillOwnerSkillSet, Visa } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { DEFAULT_PIC, emailRegex, phoneRegex, ssnRegex, urlRegex } from 'src/app/core/constants/constant';
import { ERole } from 'src/app/core/models';
import { AuthenticationService } from '../authentication/authentication.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: Registration;
  federalFileShow: boolean = false;
  tabs: string[] = ['Basic Details', 'Personal Details', 'Work', 'Skillsets'];
  _tabSelection: number = 0;
  profilePic: string = DEFAULT_PIC;
  @ViewChild('picSelector') picSelector!: ElementRef<HTMLInputElement>;
  formOne!: FormGroup;
  formTwo!: FormGroup;
  formThree!: FormGroup;
  formFour!: FormGroup;
  portfolioUrl: FormGroup[] = [];
  bsConfig: Partial<BsDatepickerConfig> = { isAnimated: true, dateInputFormat: 'MM/DD/YYYY', containerClass: 'theme-dark-blue' };
  maxDate: Date = subYears(new Date(), 18);
  genders: SkillOwnerGender[] = [];
  ownerInfo!: SkillOwnerDto;
  resumeFiles: File[] = [];
  otherFiles: File[] = [];
  federalFile: File[] = [];
  restrictions = { aboutMe: 500, synopsis: 500, zipCode: 5, portfolioMax: 5 };
  toggler = { ssn: false };
  years: number[] = [];
  months: number[] = [];
  _states: { state_name: string }[] = [];
  _cities = { [EMailing.CURRENT]: [], [EMailing.PERMANENT]: [] };
  readonly mailing = EMailing;
  clientInfo!: ClientEntity;
  clientInfoId!:number;
  technologies: OwnerSkillTechnologies[] = [];
  roles: OwnerSkillRoles[] = [];
  levels: OwnerSkillLevel[] = [];
  domains: OwnerSkillDomain[] = [];
  experience: { [key: string]: string[] } = {};
  _experience: any[] = [];
  today: Date = new Date();
  bsConfigFx: Partial<BsDatepickerConfig> = { isAnimated: true, dateInputFormat: 'MMM-YYYY', showPreviousMonth: true, minMode: 'month', containerClass: 'theme-dark-blue' };
  mySkillSets: SkillOwnerSkillSet[] = [];
  skillEdit!: FormGroup;
  visaStatuses: Visa[] = [];
  userStatus!: string;
  haveVisa: boolean = false;
  optionals = {
    trueFalse: [
      { label: 'True', value: true },
      { label: 'False', value: false },
    ],
    yesNo: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ]
  }
  _federalSecurity: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly _appService: AppService,
    private readonly _service: ProfileService,
    private readonly _authService: AuthenticationService,
    private readonly datePipe: DatePipe,
    private readonly profileService: ProfileService) {
    this.user = this._appService.user;

    const j = [ERole.OWNER];
    const i = j.findIndex(e => e === this._appService.user?.roles?.rolesId) ?? -1;

    i === -1 ? this.router.navigateByUrl('unauthorized') : null;
  }

  ngOnInit(): void {
    this.init();
    this.preload();
    Array(16).fill('').forEach((e, i) => this.years.push(i));
    Array(12).fill('').forEach((e, i) => this.months.push(i));
  }

  init(): void {
    this.formOne = this.fb.group({
      'firstName': [null, [Validators.required]],
      'lastName': [null, [Validators.required]],
      'primaryEmail': [null, [Validators.required, Validators.pattern(emailRegex)]],
      'primaryContact': [null, [Validators.required, Validators.pattern(phoneRegex)]],
      'alternateEmail': [null, [Validators.pattern(emailRegex)]],
      'alternateContact': [null, [Validators.pattern(phoneRegex)]],
      'dob': [null, [Validators.required]],
      'gender': [null, [Validators.required]],
      'status': [true, [Validators.required]],
      'federalSecurityClearance': [null, []],
      'about': [null, [Validators.required, Validators.maxLength(this.restrictions.aboutMe)]],
    });
    ['firstName', 'lastName', 'primaryEmail', 'primaryContact', 'dob'].forEach(e => this.formOne.get(e)?.disable());

    this.formTwo = this.fb.group({
      'ssn': [null, [Validators.required, Validators.pattern(ssnRegex)]],
      'years': [null, [Validators.required]],
      'months': [null, [Validators.required]],
      'currentAddress': [null, [Validators.required]],
      'currentAddress1': [null, []],
      'currentState': [null, [Validators.required]],
      'currentCity': [null, [Validators.required]],
      'currentZipcode': [null, [Validators.required, Validators.minLength(this.restrictions.zipCode), Validators.maxLength(this.restrictions.zipCode)]],
      'copy': [false], //Copy the info from current to permanent
      'permanentAddress': [null, [Validators.required]],
      'permanentAddress1': [null, []],
      'permanentState': [null, [Validators.required]],
      'permanentCity': [null, [Validators.required]],
      'permanentZipcode': [null, [Validators.required, Validators.minLength(this.restrictions.zipCode), Validators.maxLength(this.restrictions.zipCode)]],
      'linkedIn': [null],
      'usAuthorization': [null, []],
      'usc': [null, []],
      'visaType': [null, []],
      'visaEndDate': [null, []],
      'visaStartDate': [null, []],
      'visaStatus': [null, []],
    });

    const { visaStartDate, visaEndDate, visaStatus } = this.f2;
    visaStatus?.valueChanges?.subscribe(() => {
      const j = visaStatus?.value;
      const controls = [visaStartDate, visaEndDate];
      j == true
        ? controls.forEach(e => e?.setValidators(Validators.required))
        : controls.forEach(e => e?.clearValidators());

      this.formTwo?.updateValueAndValidity();
    });

    visaStartDate?.valueChanges?.subscribe(() => visaEndDate?.setValue(null));
    visaEndDate?.valueChanges?.subscribe(() => {
      const j = new Date(visaStartDate?.value);
      const k = new Date(visaEndDate?.value);
      !isAfter(k, j) ? visaEndDate?.setErrors({ minDate: true }) : null;
    });
    /** Add one default portfolio field.  */
    this.addPortfolio();

    this.formThree = this.fb.group({
      'title': [null, [Validators.required]],
      'company': [null, [Validators.required]],
      'startDate': [null, [Validators.required]],
      'endDate': [null, [Validators.required]],
      'project': [null, [Validators.required]],
      'department': [null, [Validators.required]],
      'description': [null, [Validators.required]],
      'location': [null, [Validators.required]],
    });

    const { startDate, endDate } = this.formThree.controls;
    startDate?.valueChanges?.subscribe(() => endDate?.setValue(null));
    endDate?.valueChanges?.subscribe(() => {
      const j = startDate.value, k = endDate?.value;
      !isAfter(k, j) ? endDate?.setErrors({ minDate: true }) : null;
    });

    this.formFour = this.fb.group({
      'technology': [null, [Validators.required]],
      'role': [null, [Validators.required]],
      'level': [null, [Validators.required]],
      'domain': [null, [Validators.required]],
      'lastUsed': [null, [Validators.required]],
      'experience': [null, [Validators.required]]
    });

    this.skillEdit = this.fb.group({
      'id': [null, [Validators.required]],
      'technology': [null, [Validators.required]],
      'role': [null, [Validators.required]],
      'level': [null, [Validators.required]],
      'domain': [null, [Validators.required]],
      'lastUsed': [null, [Validators.required]],
      'experience': [null, [Validators.required]]
    });

    const loadExperience = (e: string | number) => {
      const i = this.levels.findIndex(j => j?.skillSetLevelId == e) ?? -1;
      if (i === -1) return this._experience = [];
      const k = this.levels[i]?.skillLevelDescription ?? 'null';
      this._experience = this.experience[k];
    };

    const kk = this.formFour?.get('level');
    kk?.valueChanges.pipe(filter(e => kk.valid)).subscribe((e) => loadExperience(e));

    const mm = this.skillEdit?.get('level');
    mm?.valueChanges.pipe(filter(e => mm.valid)).subscribe((e) => loadExperience(e));
  }

  preload(): void {
    this.getOwnerInfo()
      .then(() => {
        this.getGenderList();
        this.getResumeFiles();
        this.getOtherFiles();
        this.getFederalFile();
        this.getStates();
        this.getClientInfo();
        this.getSkillSets();
        this.getVisa();
      });
  }

  changePic(): void {
    this.picSelector.nativeElement?.click();
    this.picSelector.nativeElement.onchange = (e: Event) => {
      const files = (e?.target as HTMLInputElement)?.files ?? [];
      const threshold = (1024 * 1000) * 1; //1MB

      if (!['image/png', 'image/jpg', 'image/jpeg'].includes(files[0]?.type ?? '')) return this._appService.toastr('Select the image type of JPEG, JPG, PNG', { icon: 'error' });
      if (files[0]?.size > threshold) return this._appService.toastr('File size is has to be lesser or equal to 1MB.', { icon: 'error' });

      let ii = '';
      const reader = new FileReader();

      reader?.readAsDataURL(files[0]);
      reader.onload = (ev: any) => {
        ii = ev?.target?.result;
        this.profilePic = ii;

        this._service.insertProfile(this.user?.id as number, files[0])
          .subscribe(() => {
            this._appService.toastr('Profile Picture Added Successfully', { icon: 'success' });
          }, (err) => {
            this._appService.toastr(err, { icon: 'error' });
          });
      };
    }
  }

  uploadResume(): void {
    this.picSelector.nativeElement?.click();
    this.picSelector.nativeElement.onchange = (e: Event) => {
      const files = (e?.target as HTMLInputElement)?.files ?? [];
      if (files.length === 0) return;

      const threshold = (1024 * 1000) * 3; //3MB

      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(files[0]?.type ?? '')) return this._appService.toastr('Select the document type of PDF, WORD, DOC', { icon: 'error' });
      if (files[0]?.size > threshold) return this._appService.toastr('File size is has to be lesser or equal to 3MB.', { icon: 'error' });

      this._service.insertResume(this.user?.id as number, files[0])
        .subscribe(() => {
          this.resumeFiles = [];
          this.resumeFiles.push(files[0]);
          this._appService.toastr('Resume Added Successfully', { icon: 'success' });
        }, (err) => {
          this._appService.toastr(err, { icon: 'error' });
        });
    };
  }

  uploadDocuments(): void {
    if (this.otherFiles.length > 3) return;

    this.picSelector.nativeElement?.click();
    this.picSelector.nativeElement.onchange = (e: Event) => {
      const files = (e?.target as HTMLInputElement)?.files ?? [];
      if (files.length === 0) return;

      const threshold = (1024 * 1000) * 1; //1MB

      const inventory = [] as File[];
      Array(files.length).fill('').forEach((e, i: number) => {
        if (files[i]?.size > threshold) return this._appService.toastr('File size is has to be lesser or equal to 1MB.');
        inventory.push(files[i]);
      });

      this._service.insertDocument(this.user?.id as number, inventory)
        .subscribe(() => {
          this._appService.toastr('Other Files Added Successfully', { icon: 'success' });
          inventory.forEach(e => this.otherFiles.push(e));
        }, (err) => {
          this._appService.toastr(err, { icon: 'error' });
        });

    };
  }

  uploadFedaral(): void {
    this.picSelector.nativeElement?.click();
    this.picSelector.nativeElement.onchange = (e: Event) => {
      const files = (e?.target as HTMLInputElement)?.files ?? [];
      const threshold = (1024 * 1000) * 1; //1MB
      // const inventory = [] as File[];
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(files[0]?.type ?? '')) return this._appService.toastr('Select the document type of PDF, WORD, DOC', { icon: 'error' });
      if (files[0]?.size > threshold) return this._appService.toastr('File size is has to be lesser or equal to 1MB.', { icon: 'error' });

      this._service.insertFederal(this.user?.id as number, files[0])
        .subscribe(() => {
          this.federalFile = [];
          this.federalFile.push(files[0]);
          this._appService.toastr('Fedaral file Added Successfully', { icon: 'success' });
          this.federalFileShow = false;
        }, (err) => {
          this._appService.toastr(err, { icon: 'error' });
        });

    };
  }

  fedaralSecurity(event: Event) {
    // const target = (event.target as HTMLInputElement)?.checked;
    this._federalSecurity = (event.target as HTMLInputElement)?.checked ?? false
  }


  onlyNumber(e: KeyboardEvent): void {
    this._appService.onlyNumber(e);
  }

  deleteOtherFile(n: File, i: number): void {
    this._service.deleteOtherFiles(this.user?.id as number, i)
      .subscribe(() => {
        this.otherFiles.splice(i, 1);
        this._appService.toastr(`${n?.name} Deleted Successfully`, { icon: 'success' });
      }, (err) => this._appService.toastr(err));
  }

  copyAddress(ev: Event): void {
    this.f2?.copy?.setValue((ev.target as HTMLInputElement)?.checked ?? false);

    const { value } = this.f2.copy;

    /** Please don't change the positions in j & k. Because it has proper index.  */
    const j = ['currentAddress', 'currentAddress1', 'currentState', 'currentCity', 'currentZipcode'],
      k = ['permanentAddress', 'permanentAddress1', 'permanentState', 'permanentCity', 'permanentZipcode'];

    const controls = {} as { [key: string]: AbstractControl };
    j.forEach(e => controls[e] = (this.formTwo.get(e) as AbstractControl));
    const n = this.fb.group(controls);

    if (value && n?.valid) {
      k.forEach((e, i) => {
        const a = (j[i]); // Current mailing key.
        const b = this.formTwo.get(a); // Current mailing control.
        const c = this.formTwo.get(e); // Present mailing control.

        c?.setValue(b?.value ?? null);
        c?.disable();
      });
      this._cities[this.mailing.PERMANENT] = this._cities[this.mailing.CURRENT];
    }

    if (!value) {
      k.forEach(e => {
        const c = this.formTwo.get(e);
        c?.setValue(null);
        c?.enable();
      });
    }
  }

  addPortfolio(url?: string): void {
    if (!this.portfolioUrl.every(e => e.valid)) return; // All the portfolio fields has to be valid.

    if (this.portfolioUrl?.length < this.restrictions?.portfolioMax) {
      const n = this.fb.group({ 'url': [url ?? null, [Validators.required, Validators.pattern(urlRegex)]] });
      this.portfolioUrl.push(n);
    }
  }

  deletePortfolio(i: number): void {
    this.portfolioUrl?.length > 1 ? this.portfolioUrl.splice(i, 1) : null;
  }

  saveBasicInfo(): void {
    if (!this.formOne.valid) return;
    if (this._federalSecurity && this.federalFile.length == 0) {
      this.federalFileShow = true;
      return this._appService.toastr('Federal is Mandatory');
    }
    if (this.resumeFiles.length === 0) return this._appService.toastr('Resume is Mandatory');

    const j = this.formOne?.getRawValue();

    const k: SkillOwnerEntity = {
      skillOwnerEntityId: this.user?.id,
      primaryEmail: j?.primaryEmail,
      ownerSkillStatusEntity: { skillOwnerStatusId: j?.status === true ? 1 : 2, },
      phoneNumber: j?.primaryContact ?? null,
      aboutMe: j?.about ?? null,
      firstName: j?.firstName ?? null,
      lastName: j?.lastName ?? null,
      alternateEmail: j?.alternateEmail ?? null,
      alternatePhoneNumber: j?.alternateContact ?? null,
      gender: { id: j?.gender ?? null },
      federalSecurityClearance: this._federalSecurity
    };

    this._service.updateOwnerProfile(k)
      .subscribe(() => {
        this._appService.toastr('Basic Details Updated Successfully', { icon: 'success' });
      }, (err) => this._appService.toastr(err));
  }

  savePersonalInfo(): void {
    if (!this.formTwo.valid) return;


    const j = this.formTwo.getRawValue();

    const f1 = this.formOne?.getRawValue();
    // console.log(j?.status);
    const k: SkillOwnerEntity = {
      accountStatus: j?.status === true ? true : false,
      skillOwnerEntityId: this.user?.id,
      primaryEmail: f1?.primaryEmail,
      ownerSkillStatusEntity: { skillOwnerStatusId: f1?.status === true ? 1 : 2, },
      ssn: j?.ssn ?? null,
      state: j?.currentState ?? null,
      city: j?.currentCity ?? null,
      address: `${j?.currentAddress},${j?.currentAddress1 ?? ' '},${j?.currentZipcode}`,
      permanentState: j?.permanentState ?? null,
      permanentCity: j?.permanentCity ?? null,
      permanentAddress: j?.copy
        ? `${j?.currentAddress},${j?.currentAddress1 ?? ' '},${j?.currentZipcode}`
        : j?.permanentAddress ? `${j?.permanentAddress ?? ''},${j?.permanentAddress1 ?? ' '},${j?.permanentZipcode}` : null as any,
      expMonths: j?.months ?? 0,
      expYears: j?.years ?? 0,
      linkedIn: j?.linkedIn ?? null,
      portfolioUrl: (this.portfolioUrl.filter(e => e?.valid).map(e => ({ portfolioUrls: e?.value?.url }))) ?? [],
      usAuthorization: j?.usAuthorization ?? false,
      usc: j?.usc ?? false,
      federalSecurityClearance: this._federalSecurity,
      ...(this.haveVisa && {
        visaStatus: {
          visaId: j?.visaType
        }
      }),
      statusVisa: j?.visaStatus ? 'Active' : 'Inactive',
      ...(j?.visaType && j?.visaStatus) && {
        visaStartDate: new Date(j.visaStartDate as any)?.toISOString() ?? '',
        visaEndDate: new Date(j.visaEndDate as any)?.toISOString() ?? '',
      },

    };

    this._service.updateOwnerProfile(k)
      .subscribe(() => {
        this._appService.toastr('Personal Details Updated Successfully', { icon: 'success' });
      }, (err) => this._appService.toastr(err));
  }

  saveClientInfo(): void {
    if (!this.formThree.valid) return;

    const j = this.formThree.getRawValue();

    const k: Client = {
      skillOwnerEntityId: this.user?.id,
      ...(this.clientInfoId && {clientId:this.clientInfoId}),
      jobTitle: j?.title ?? null,
      employerName: j?.company ?? null,
      project: j?.project ?? null,
      projectDescription: j?.description ?? null,
      department: j?.department ?? null,
      startDate: this.datePipe.transform(j?.startDate, 'yyyy-MM-dd') ?? '',
      endDate: this.datePipe.transform(j?.endDate, 'yyyy-MM-dd') ?? '',
      currentEmployer: true,
      location: j?.location ?? null,
    };
    const array = [];
    array.push(k)
    this._service.saveClientInfo(array)
      .subscribe(() => {
        this._appService.toastr('Work Details Updated Successfully', { icon: 'success' });
      }, (err) => this._appService.toastr(err));
  }

  editSkill(i: number): void {
    const n = this.mySkillSets[i];
    (n as any)['edit'] = true;
    this.skillEdit.patchValue({
      'id': n?.ownerSkillSetId,
      'technology': n?.ownerSkillTechnologiesEntity?.technologyId ?? null,
      'role': n?.ownerSkillRolesEntity?.rolesId ?? null,
      'level': n?.ownerSkillLevelEntity?.skillSetLevelId ?? null,
      'domain': n?.ownerSkillDomainEntity?.domainId ?? null,
      'lastUsed': new Date(n?.lastUsed as string) ?? null,
      'experience': n?.experience ?? null
    });
  }

  deleteSkill(i: number): void {
    const j = this.mySkillSets[i];

    this._appService.confirmation(
      'Are you sure?',
      `You won't be able to revert this!`,
      { showCancelButton: true, confirmButtonText: 'Yes, archive it' }
    ).then((confirm) => {
      if (!confirm) return;

      this._service.deleteSkill(j?.ownerSkillSetId as number)
        .subscribe(() => {
          this.getMySkillSets();
          this._appService.toastr('Successfully deleted', { icon: 'success' });
        }, (err) => {
          this._appService.toastr(err);
        });
    });
  }

  saveSkillSet(i: number): void {
    const n = this.skillEdit.getRawValue();

    const j: SkillOwnerSkillSet = {
      ownerSkillSetId: n?.id,
      skillOwnerEntityId: this.user?.id,
      ownerSkillLevelEntity: { skillSetLevelId: n?.level, },
      ownerSkillTechnologiesEntity: { technologyId: n.technology, },
      ownerSkillRolesEntity: { rolesId: n?.role, },
      ownerSkillDomainEntity: { domainId: n?.domain, },
      experience: n?.experience,
      lastUsed: this.datePipe.transform(n?.lastUsed, 'MMM-yyyy') as string,
    };

    this._service.saveSkillSet(j)
      .subscribe(() => {
        this._appService.toastr('Skillset Data Added Successfully!', { icon: 'success' });
        this.cancelSkillSet(i);
        this.getMySkillSets();
      }, (err) => { });
  }

  cancelSkillSet(i: number): void {
    const n = this.mySkillSets[i];
    (n as any)['edit'] = false;
    this.skillEdit?.reset();
  }

  addSkillSet(): void {
    const n = this.formFour.getRawValue();
    const j: SkillOwnerSkillSet = {
      skillOwnerEntityId: this.user?.id,
      ownerSkillLevelEntity: { skillSetLevelId: n?.level, },
      ownerSkillTechnologiesEntity: { technologyId: n.technology, },
      ownerSkillRolesEntity: { rolesId: n?.role, },
      ownerSkillDomainEntity: { domainId: n?.domain, },
      experience: n?.experience,
      lastUsed: this.datePipe.transform(n?.lastUsed, 'MMM-yyyy') as string,
    };

    this._service.addSkillSets(j)
      .subscribe(() => {
        this.formFour?.reset();
        this._appService.toastr('Skillset Added Successfully!', { icon: 'success' });
        this.getMySkillSets();
      }, (err) => {
        this._appService.toastr(err, { icon: 'error' });
      })
  }

  getOwnerInfo(): Promise<void> {
    return new Promise((resolve) => {
      const id = this.user?.id;
      if (!id) return resolve();

      this._service.getOwnerInfo(id)
        .subscribe((j) => {
          this.ownerInfo = j;
          this._federalSecurity = j?.federalSecurityClearance as boolean;
          this.formOne.patchValue({
            'federalSecurityClearance': j?.federalSecurityClearance ?? null,
            'firstName': j?.firstName ?? null,
            'lastName': j?.lastName ?? null,
            'primaryEmail': j?.primaryEmail ?? null,
            'primaryContact': j?.phoneNumber ?? null,
            'alternateEmail': j?.alternateEmail ?? null,
            'alternateContact': j?.alternatePhoneNumber ?? null,
            'dob': j?.dob ? new Date(j?.dob) : null,
            'gender': j?.gender?.id ?? null,
            'status': j?.ownerSkillStatusEntity?.skillOwnerStatusId === 1 ? true : false,
            'about': j?.aboutMe ?? null,
          });
          const m = j?.address?.split(',') ?? [];
          const n = j?.permanentAddress?.split(',') ?? [];
          this.formTwo.patchValue({
            'ssn': j?.ssn,
            'years': j?.expYears,
            'months': j?.expMonths,
            'currentAddress': m[0] ?? null,
            'currentAddress1': m[1] ? m[1] : null ?? null,
            'currentZipcode': m[2] ?? null,
            'currentState': j?.state,
            'currentCity': j?.city,
            ...(JSON.stringify(m) === JSON.stringify(n)) && { 'copy': true },
            ...(j?.permanentAddress) && {
              'permanentAddress': n[0] ?? null,
              'permanentAddress1': n[1] ? n[1] : null ?? null,
              'permanentZipcode': n[2] ?? null,
              'permanentState': j?.permanentState,
              'permanentCity': j?.permanentCity,
            },
            'linkedIn': j?.linkedIn,
            'usAuthorization': j?.usAuthorization ?? null,
            'usc': j?.usc ?? null,
            'visaType': j?.visaStatus?.visaId ?? null,
            'visaStatus': j?.statusVisa === 'Active',
            ...(j?.visaStatus && j?.visaStatus?.visaId) && {
              'visaStartDate': new Date(j.visaStartDate as any) ?? null,
              'visaEndDate': new Date(j.visaEndDate as any) ?? null,
            }
          });

          j?.ownerSkillStatusEntity && j.ownerSkillStatusEntity?.skillOwnerStatusId === 1
            ? (this.userStatus = 'Active', this.formTwo.get('status')?.patchValue(true))
            : (this.userStatus = 'Not Active', this.formTwo.get('status')?.patchValue(false));

          this.haveVisa = j?.visaStatus ? true : false;

          if ((j?.portfolioUrl ?? []).length > 0) {
            this.portfolioUrl = [];
            //Please maintain the regex same as add portfolio
            const mm = j?.portfolioUrl?.filter(e => urlRegex?.test(e.portfolioUrls as string) ?? false) ?? [];
            mm.forEach(e => this.addPortfolio(e.portfolioUrls));
          }

          this.getCities(this.mailing.CURRENT, false);
          j?.permanentAddress ? this.getCities(this.mailing.PERMANENT, false) : null;
          (j?.permanentAddress && JSON.stringify(m) === JSON.stringify(n) && m.length>0)
            ? ['permanentAddress', 'permanentAddress1', 'permanentState', 'permanentCity', 'permanentZipcode'].forEach(e => this.formTwo.get(e)?.disable())
            : null;

          this._appService.profilePic(id).then((e) => this.profilePic = e);

          resolve();
        }, (err) => (this._appService.toastr(err), resolve()))
    })
  }

  getClientInfo(): Promise<void> {
    return new Promise((resolve) => {
      this._service.getClientInfo(this.user?.id as number)
        .subscribe((j) => {
          const i = j?.client?.findIndex(e => e.currentEmployer === true) ?? -1;
          if (i === -1) return;

          this.clientInfo =j?.client?.reduce((a:ClientEntity,b:ClientEntity)=>{ return a?.clientId! > b?.clientId! ? a : b;})!
          const k = this.clientInfo;
          this.clientInfoId=this.clientInfo.clientId!
          this.formThree.patchValue({
            'title': k?.jobTitle ?? null,
            'company': k?.employerName ?? null,
            'startDate': new Date(k?.startDate as any) ?? null,
            'endDate': new Date(k?.endDate as any) ?? null,
            'project': k?.project ?? null,
            'department': k?.department ?? null,
            'description': k?.projectDescription ?? null,
            'location': k?.location ?? null,
          });
        }, (err) => { });
    });
  }

  getGenderList(): void {
    this._service.getGenderList()
      .subscribe((j) => {
        this.genders = j;
      }, (err) => { });
  }

  getResumeFiles(): void {
    this._service.getResumeFiles(this.user?.id as number)
      .subscribe((j) => {
        const k = {
          name: j?.fileName, size: j?.size,
          lastModified: 1664008613761,
          lastModifiedDate: '',
          webkitRelativePath: j?.fileDownloadUri,
        };
        this.resumeFiles.push(k as any);
      }, (err) => { });
  }

  getOtherFiles(): void {
    this._service.getOtherFiles(this.user?.id as number)
      .subscribe((j) => {
        const k = {
          name: j?.fileName, size: j?.size,
          lastModified: 1664008613761,
          lastModifiedDate: '',
          webkitRelativePath: j?.fileDownloadUri,
        };
        this.otherFiles.push(k as any);
      }, (err) => { });
  }

  getFederalFile(): void {
    this._service.getFederalFile(this.user?.id as number)
      .subscribe((j) => {
        const k = {
          name: j?.fileName, size: j?.size,
          lastModified: 1664008613761,
          lastModifiedDate: '',
          webkitRelativePath: j?.fileDownloadUri,
        };
        this.federalFile.push(k as any);
      }, (err) => { })
  }

  getStates(): void {
    this._authService.getState()
      .subscribe((j) => {
        this._states = j as any[];
      }, (err) => { });
  }

  getCities(type: EMailing, reset: boolean = true): void {
    const { currentCity, currentState, permanentCity, permanentState } = this.f2;

    const j = {
      [EMailing.CURRENT]: { city: currentCity, state: currentState },
      [EMailing.PERMANENT]: { city: permanentCity, state: permanentState },
    };

    const k = j[type] ?? null;
    if (!k || !k?.state?.valid) return;

    this._authService.getCityList(k?.state?.value)
      .subscribe((res) => {
        (this._cities as any)[type] = res;
        reset ? k?.city?.setValue(null) : null;
      }, (err) => { });
  }

  getSkillSets(): void {
    this.getMySkillSets();
    this.getTechnologies();
    this.getRoles();
    this.getLevels();
    this.getDomains();
    this.getExperience();
  }

  getMySkillSets(): void {
    this._service.getMySkillSets(this.user?.id as number)
      .subscribe((j) => {
        this.mySkillSets = j;
        this.mySkillSets.forEach((e: any) => e['edit'] = false);
      }, (err) => { });
  }

  getTechnologies(): void {
    this._service.getTechnologies()
      .subscribe((j) => {
        this.technologies = j;
      }, (err) => { });
  }

  getRoles(): void {
    this._service.getRoles()
      .subscribe((j) => {
        this.roles = j;
      }, (err) => { });
  }

  getLevels(): void {
    this._service.getLevels()
      .subscribe((j) => {
        this.levels = j;
      }, (err) => { });
  }

  getDomains(): void {
    this._service.getDomains()
      .subscribe((j) => {
        this.domains = j;
      }, (err) => { });
  }

  getExperience(): void {
    this._service.getExperience()
      .subscribe((j) => {
        const k = {} as any;
        k['null'] = [];
        j.forEach((e: any) => {
          // k[e.id as number] = e?.experience;
          let n = e[0] as string ?? null;
          k[n] = (e[1] as string).split(',');
        });
        this.experience = k;
      }, (err) => { });
  }

  tabSelection(i: number): void {
    this._tabSelection = i;
  }

  navigate(url: string): void {
    this.router.navigateByUrl(url);
  }

  get f1() { return this.formOne.controls }

  get f2() { return this.formTwo.controls }

  get f3() { return this.formThree.controls }

  getVisa() {
    this.profileService.getVisa().subscribe((response) => {
      this.visaStatuses = response;
    });
  }

  visaToggle(status: boolean): void {
    this.haveVisa = status ?? false;
  }

}

enum EMailing {
  PERMANENT = 'permanent',
  CURRENT = 'current'
}
