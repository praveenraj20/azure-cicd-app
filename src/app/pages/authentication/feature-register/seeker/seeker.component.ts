import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwnerSkillDomain, OwnerSkillTechnologies, Registration } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { einRegex, emailRegex, phoneRegex } from 'src/app/core/constants/constant';
import { ERole } from 'src/app/core/models';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss']
})
export class SeekerComponent implements OnInit {
  form!: FormGroup;
  /** Default step is 1  */
  step: number = 1;
  countries: { shortName: string; name: string; }[] = [];
  _states: { state_name: string }[] = [];
  _cities: { city_name: string }[] = [];
  technologies: OwnerSkillTechnologies[] = [];
  domains: OwnerSkillDomain[] = [];
  registerInfo!: Registration;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly _service: AuthenticationService,
    private readonly _appService: AppService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'emailId': ['', [Validators.required, Validators.pattern(emailRegex)]],
      'phone': ['', [Validators.required, Validators.pattern(phoneRegex)]],
      'businessName': ['', [Validators.required]],
      'businessNumber': ['', [Validators.required, Validators.pattern(einRegex)]],
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'state': [null, [Validators.required]],
      'city': [null, [Validators.required]],
      'domain': [null, [Validators.required]],
      'acceptTerms': [false, [Validators.requiredTrue]],
    });

    this.getDomains();
    this.getStates();
    this.getTechnologies();
  }

  next(n: number): void {
    this.step = n;
  }

  previous(n: number): void {
    this.step = n;
  }

  navigate(url: string): void {
    this.router.navigateByUrl(url);
    setTimeout(() => url === '/register' ? window?.location?.reload() : null, 100);
  }

  onSubmit(): void {
    if (!this.form?.valid) return;

    const { value } = this.form;

    const j = {
      roles: { rolesId: ERole.SEEKER, },
      firstName: value?.firstName,
      lastName: value?.lastName,
      emailId: value?.emailId,
      businessName: value?.businessName,
      taxIdBusinessLicense: value?.businessNumber,
      contactPhone: value?.phone,
      city: value?.city,
      state: value?.state,
      domainId: value?.domain
    };

    this._service.register(j)
      .subscribe((data) => {
        this.registerInfo = data;
        this.next(6);
      }, (error) => {
        this._appService.toastr(error);
      });
  }

  resend(): void {
    const id = this.registerInfo?.id ?? null;
    if (!id) return;

    this._service.resend(id)
      .subscribe((j) => {
        this._appService.toastr('Email has been resent successfully.', { icon: 'success' });
      }, (err) => this._appService.toastr(err));
  }

  getDomains(): void {
    this._service.getDomainList()
      .subscribe((j) => { this.domains = j; }, (err) => { });
  }

  getStates(): void {
    this._service.getState()
      .subscribe((j) => { this._states = j as any[] }, (err) => { });
  }

  getCities(): void {
    const { state, city } = this.f;
    if (!state?.valid) return;
    this._service.getCityList(state?.value)
      .subscribe((j) => {
        this._cities = j as any[];
        city?.setValue(null);
      }, (err) => { });
  }

  getTechnologies(): void {
    this._service.getTechnologyList()
      .subscribe((j) => {
        this.technologies = j;
      }, (err) => { });
  }

  get f() {
    return this.form.controls;
  }

  get stepTwo(): FormGroup {
    return new FormGroup({
      'state': this.f?.state,
      'city': this.f?.city
    });
  }

  get stepThree(): FormGroup {
    return new FormGroup({
      'businessNumber': this.f?.businessNumber,
      'businessName': this.f?.businessName
    });
  }

  get stepFour(): FormGroup {
    return new FormGroup({
      'firstName': this.f?.firstName,
      'lastName': this.f?.lastName
    });
  }

  get stepFive(): FormGroup {
    return new FormGroup({
      'emailId': this.f?.emailId,
      'phone': this.f?.phone
    });
  }

  onlyNumber(event: KeyboardEvent): void {
    const regex = /[0-9\\.\\]/;
    const character = String.fromCharCode(event?.charCode);
    event?.keyCode !== 8 && !regex.test(character) ? event?.preventDefault() : null;
  }

}
