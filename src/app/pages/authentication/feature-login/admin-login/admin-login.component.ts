import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Registration } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { emailRegex } from 'src/app/core/constants/constant';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  form!: FormGroup;
  toggle: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly _service: AuthenticationService,
    private readonly _appService: AppService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      password: ['', [Validators.required]],
    });
  }

  toggler(): void {
    this.toggle = !this.toggle;
  }

  onSubmit(): void {
    if (!this.form?.valid) return;

    const { email, password } = this.form.value;
    const j = { emailId: email, password };
    this._service._login(j)
      .subscribe((e: Registration) => {
        this._appService.user = e;
        this.router.navigateByUrl('/dashboard');
      }, (err) => {
        this._appService.toastr(err);
      });
  }

  forgot(): void {
    if (!this.f?.email?.valid) return;
    const { email } = this.form.value;


  }

  get f(): { [key: string]: AbstractControl } {
    return this.form?.controls;
  }
}
