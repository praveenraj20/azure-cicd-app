import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  OwnerSkillTechnologies,
  Registration,
  WorkForceStrength,
} from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import {
  einRegex,
  emailRegex,
  phoneRegex,
} from 'src/app/core/constants/constant';
import { ERole } from 'src/app/core/models';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss'],
})
export class PartnerComponent implements OnInit {
  form!: FormGroup;
  /** Default step is 1  */
  step: number = 1;
  selected = 'US';
  countries: { shortName: string; name: string }[] = [];
  _states: { state_name: string }[] = [];
  _cities: { city_name: string }[] = [];
  strength: WorkForceStrength[] = [];
  skills: string[] = [];
  _skills: any[] = [];
  technologies: OwnerSkillTechnologies[] = [];
  registerInfo!: Registration;

  constructor(
    private readonly _service: AuthenticationService,
    private readonly _appService: AppService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      emailId: ['', [Validators.required, Validators.pattern(emailRegex)]],
      phone: ['', [Validators.required, Validators.pattern(phoneRegex)]],
      businessName: ['', [Validators.required]],
      businessNumber: ['', [Validators.required, Validators.pattern(einRegex)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
      strength: [''],
      acceptTerms: [false, [Validators.requiredTrue]],
      skills: [null],
    });

    this.getStates();
    this.getStength();
    this.getTechnologies();
  }

  checked(event: Event): void {}

  addSkill(): void {
    const i = this.skills.findIndex((e) => e === this.f?.skills?.value);
    if (i > -1)
      return this._appService.toastr('Value Already exist', {
        icon: 'warning',
      });
    this.skills.push(this.f?.skills?.value);

    const ii =
      this.technologies.findIndex(
        (e) => this.f?.skills?.value === e?.technologyValues
      ) ?? -1;
    const m = this.technologies[ii] ?? null;
    this._skills.push({
      id: ii > -1 ? m?.technologyId : null,
      label: this.f?.skills?.value,
    });

    /** Please set the value at last, because we are comparing a value.  */
    this.f?.skills?.setValue(null);
  }

  removeSkill(i: number): void {
    this.skills.splice(i, 1);
  }

  next(n: number): void {
    this.step = n;
  }

  previous(n: number): void {
    this.step = n;
  }

  navigate(url: string): void {
    this.router.navigateByUrl(url);
    this._appService
      .timeout()
      .then(() => (url === '/register' ? window?.location?.reload() : null));
  }

  onSubmit(): void {
    if (!this.form?.valid) return;

    const { value } = this.form;

    const id: number[] = [],
      tech: string[] = [];
    this._skills.forEach((e) =>
      e?.id === null ? tech.push(e?.label) : id.push(e?.id)
    );

    const j = {
      roles: { rolesId: ERole.PARTNER },
      firstName: value?.firstName,
      emailId: value?.emailId,
      businessName: value?.businessName,
      lastName: value?.lastName,
      taxIdBusinessLicense: value?.businessNumber,
      contactPhone: value?.phone,
      city: value?.city,
      state: value?.state,
      workForceStrength: { id: value?.strength },
      technologyIds: id?.toString() ?? '',
      customTech: tech?.toString() ?? '',
    };

    this._service.register(j).subscribe(
      (data) => {
        this.registerInfo = data;
        this.next(7);
      },
      (error) => {
        this._appService.toastr(error);
      }
    );
  }

  getStates(): void {
    this._service.getState().subscribe(
      (j) => {
        this._states = j as any[];
      },
      (err) => {}
    );
  }

  getCities(): void {
    const { state, city } = this.f;
    if (!state?.valid) return;
    this._service.getCityList(state?.value).subscribe(
      (j) => {
        this._cities = j as any[];
        city?.setValue(null);
      },
      (err) => {}
    );
  }

  getStength(): void {
    this._service.getStengthList().subscribe(
      (j) => {
        this.strength = j;
      },
      (err) => {}
    );
  }

  getTechnologies(): void {
    this._service.getTechnologyList().subscribe(
      (j) => {
        this.technologies = j;
      },
      (err) => {}
    );
  }

  get stepOne(): FormGroup {
    return new FormGroup({
      state: this.f?.state,
      city: this.f?.city,
    });
  }

  get stepTwo(): FormGroup {
    return new FormGroup({
      businessNumber: this.f?.businessNumber,
      businessName: this.f?.businessName,
    });
  }

  get stepFive(): FormGroup {
    return new FormGroup({
      firstName: this.f?.firstName,
      lastName: this.f?.lastName,
    });
  }

  get stepSix(): FormGroup {
    return new FormGroup({
      emailId: this.f?.emailId,
      phone: this.f?.phone,
    });
  }

  get f() {
    return this.form.controls;
  }

  onlyNumber(event: KeyboardEvent): void {
    const regex = /[0-9\\.\\]/;
    const character = String.fromCharCode(event?.charCode);
    event?.keyCode !== 8 && !regex.test(character)
      ? event?.preventDefault()
      : null;
  }

  resend(): void {
    const id = this.registerInfo?.id ?? null;
    if (!id) return;

    this._service.resend(id).subscribe(
      (j) => {
        this._appService.toastr('Email has been resent successfully.', {
          icon: 'success',
        });
      },
      (err) => this._appService.toastr(err)
    );
  }
}
