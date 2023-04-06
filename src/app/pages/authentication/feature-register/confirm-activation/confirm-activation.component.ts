import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first } from 'rxjs';
import { SetOwnerPassword, Verify } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from '../../authentication.service';
import { passwordRegex } from 'src/app/core/constants/constant';

@Component({
  selector: 'app-confirm-activation',
  templateUrl: './confirm-activation.component.html',
  styleUrls: ['./confirm-activation.component.scss'],
})
export class ConfirmActivationComponent implements OnInit {
  form!: FormGroup;
  toggle: boolean = false;
  token!: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly _service: AuthenticationService,
    private readonly _appService: AppService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [{ value: '', disabled: true }, , Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(passwordRegex)
        ],
      ],
    });

    this.route.queryParams
      .pipe(
        filter((e) => !!e && !!e?.v),
        first()
      )
      .subscribe((e) => {
        this.token = e?.v;
        const k = localStorage.getItem('email');
        const m = this.form.get('email');
        m?.setValue(this.token ?? '');
        m?.disable();
      });
  }

  toggler(): void {
    this.toggle = !this.toggle;
  }

  onSubmit(): void {

    const j: Verify = { token: this.token, password: this.form.value.password };
    this._service.verifyCandidate(j).subscribe(
      (res) => {
        this.router.navigate(['/login']);
        localStorage.removeItem('email');
      },
      (error) => {
        this._appService.toastr(error);
      }
    );
  }

  get f() {
    return this.form?.controls;
  }
}
