import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first } from 'rxjs';
import { Registration } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { emailRegex } from 'src/app/core/constants/constant';
import { Role } from 'src/app/core/models';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  toggle: boolean = false;
  user: Registration;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly _service: AuthenticationService,
    private readonly _appService: AppService) {
    this.user = this._appService.user;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      password: ['', [Validators.required]],
    });

    if (this.user && this.user?.roles) {
      this.router.navigateByUrl('/dashboard');
    }
    /* let url = '/login';
    if (this.user && this.user?.roles?.roleDescription === Role.Partner) {
      url = this.route.snapshot.queryParams['/spdashboard'] || '/spdashboard';
      this.router.navigateByUrl(url);
    } else if (this.user && this.user?.roles?.roleDescription === Role.Seeker) {
      url = this.route.snapshot.queryParams['/ssdashboard'] || '/ssdashboard';
      this.router.navigateByUrl(url);
    } else if (this.user && this.user?.roles?.roleDescription === Role.Owner) {
      url = this.route?.snapshot?.queryParams['/sodashboard'] || '/sodashboard';
      this.router.navigateByUrl(url);
    } else if (this.user && this.user?.roles?.roleDescription === Role.SuperAdmin) {
      url = this.route.snapshot.queryParams['/superadmin'] || '/superadmin';
      this.router.navigateByUrl(url);
    } else {
    } */
  }

  toggler(): void {
    this.toggle = !this.toggle;
  }

  onSubmit(): void {
    if (!this.form?.valid) return;
    const { email, password } = this.form.value;
    const j = { emailId: email, password };

    this._service.login(j)
      .subscribe((e: Registration) => {
        this._appService.user = e;
        this.router.navigateByUrl('/dashboard');
        /* if (e?.roles?.rolesId === 4) {
          const returnUrl = this.route.snapshot.queryParams['/superadmin'] || '/superadmin';
          this.router.navigateByUrl(returnUrl);
        } else if (e?.roles?.rolesId === 2) {
          const returnUrl = this.route.snapshot.queryParams['/spdashboard'] || '/spdashboard';
          this.router.navigateByUrl(returnUrl);
        } else if (e?.roles?.rolesId === 1) {
          const returnUrl = this.route.snapshot.queryParams['/ssdashboard'] || '/ssdashboard';
          this.router.navigateByUrl(returnUrl);
        } else if (e?.roles?.rolesId === 3) {
          const returnUrl = this.route.snapshot.queryParams['/sodashboard'] || '/sodashboard';
          this.router.navigateByUrl(returnUrl);
        } */
      }, (err) => {
        this._appService.toastr(err);
      });
  }

  forgot(): void {
    if (!this.f?.email?.valid) return this._appService.toastr('Please enter the registered email address');
    const { email } = this.form.value;

    this._service.setForgotPassword(email)
      .subscribe(() => {
        this._appService.toastr('Email has been sent successfully', { icon: 'success' });
      }, (error) => {
        this._appService.toastr(error);
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form?.controls;
  }
}
