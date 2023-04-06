import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, first } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from '../authentication.service';
import { passwordRegex } from 'src/app/core/constants/constant';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  token!: string;
  toggle = { one: false, two: false };

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly _service: AuthenticationService,
    private readonly _appService: AppService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(filter(e => !!e && !!e?.forgetPasswordToken), first())
      .subscribe((e) => this.token = e?.forgetPasswordToken);

    this.form = this.formBuilder.group({
      'password': ['', [Validators.required, Validators.pattern(passwordRegex)]],
      '_password': ['', [Validators.required, Validators.pattern(passwordRegex)]],
    })
  }

  onSubmit(): void {
    if (!this.form.valid) return;
    if (this.f?.password?.value !== this.f?._password?.value) return this._appService.toastr('Password mismatch', { icon: 'warning' });

    const m = this.form.value;
    const j = { forgotPassToken: this.token, oldPassword: m?.password, newPassword: m?._password, };
    this._service.verifyForgotPass(j)
      .subscribe(() => {
        this.router.navigate(['/login']);
        this._appService.toastr('Password change successfully ,proceed for login', { icon: 'success' });
      }, (error) => {
        this._appService.toastr(error);
      });
  }

  toggler(ref: 'one' | 'two'): void {
    this.toggle[ref] = !this.toggle[ref];
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form?.controls;
  }
}
