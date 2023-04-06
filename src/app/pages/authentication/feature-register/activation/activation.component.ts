import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first } from 'rxjs';
import { SetOwnerPassword } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from '../../authentication.service';
import { passwordRegex } from 'src/app/core/constants/constant';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {
  form!: FormGroup;
  toggle: boolean = false;
  token!: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly _service: AuthenticationService,
    private readonly _appService: AppService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
    });

    this.route.queryParams
      .pipe(
        filter(e => !!e && !!e?.v),
        first()
      ).subscribe((e) => {
        this.token = e?.v;
        const k = localStorage.getItem('email');
        const m = this.form.get('email');
        m?.setValue(k ?? '');
        m?.disable();
      });
  }

  toggler(): void {
    this.toggle = !this.toggle;
  }

  onSubmit(): void {
    if (!this.form?.valid || !this.token) return;

    const { email, password } = this.form?.getRawValue();
    const j: SetOwnerPassword = { emailId: email, token: this.token, password: password, };
    this._service.setPasswordForOwner(j)
      .subscribe((res) => {
        this.router.navigate(['/login']);
        localStorage.removeItem('email');
      }, (error) => {
        this._appService.toastr(error);
      });
  }

  get f() {
    return this.form?.controls;
  }

}
