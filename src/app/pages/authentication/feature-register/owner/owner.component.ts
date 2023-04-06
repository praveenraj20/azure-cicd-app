import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { subYears } from 'date-fns';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { filter, first } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { emailRegex, phoneRegex } from 'src/app/core/constants/constant';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  form!: FormGroup;
  token!: string;
  bsConfig: Partial<BsDatepickerConfig> = { isAnimated: true, dateInputFormat: 'MM/DD/YYYY', containerClass: 'theme-dark-blue' };
  maxDate: Date = subYears(new Date(), 18);

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly _service: AuthenticationService,
    private readonly datePipe: DatePipe,
    private readonly router: Router,
    private readonly _appService: AppService) { }

  ngOnInit(): void {
    this.defaultsInit();

    this.route.queryParams.pipe(
      filter(e => !!e && !!e?.v && !!e?.selection),
      first()
    ).subscribe(e => {
      this._service.verifyRegistrationForOwner(e?.v).subscribe((data) => {
        this.token = e?.v;
        this.form?.patchValue({
          'firstName': data?.firstName ?? null,
          'lastName': data?.lastName ?? null,
          'dob': this.datePipe?.transform(data?.dob, 'MM-dd-YYYY') ?? null,
          'email': data?.primaryEmail ?? null,
          'phone': data?.phoneNumber ?? null,
        });
        this.form?.updateValueAndValidity();
        console.log(this.form)
        const { email } = this.form.getRawValue();
        localStorage.setItem('email', email);
      });
    });
  }

  defaultsInit(): void {
    this.form = this.fb.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'dob': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.pattern(emailRegex)]],
      'phone': ['', [Validators.required, Validators.pattern(phoneRegex)]],
    });

    ['firstName', 'lastName', 'dob', 'email', 'phone'].forEach(j => this.form?.get(j)?.disable());
  }

  verify(): void {
    const { email } = this.form?.getRawValue();

    const j = { emailId: email, token: this.token };
    this._service.verifyCandidate(j)
      .subscribe((data) => {
        this.router.navigate(['/activate'], { queryParams: { v: this.token } });
      }, (error) => {
        this._appService.toastr(error);
      });
  }

}
