import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, map } from 'rxjs';
import { SubRoles } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { EmployeesRoleService } from '../../employees-role.service';

@Component({
  selector: 'app-seeker-map',
  templateUrl: './seeker-map.component.html',
  styleUrls: ['./seeker-map.component.scss']
})
export class SeekerMapComponent implements OnInit {
  form!: FormGroup;
  seekerId!: number;
  subroles: SubRoles[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly _service: EmployeesRoleService,
    private readonly _appService: AppService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      roleId: [null, Validators.required],
      seekerInfo: [{ value: null, disabled: true }, Validators.required],
    });

    this.route.queryParams
      .pipe(
        filter(e => !!e && !!e?.emailId && !!e?.seekerName && !!e?.seekerId),
        first()
      ).subscribe(e => {
        this.seekerId = parseInt(e?.seekerId);
        this.form.patchValue({
          'roleId': parseInt(e?.roleId) || null,
          'seekerInfo': `${e?.seekerName} - ${e?.emailId}`
        });
      });

    this.getSubRoles();
  }

  getSubRoles(): void {
    this._service.getSubRoles()
      .pipe(
        map(j => j?.filter(e => e?.id !== 1)) //Removing the admin role.
      ).subscribe((j) => (this.subroles = j), (err) => { });
  }

  saveInfo(): void {
    if (!this.form?.valid) return;
    const k = this.form.getRawValue();

    this._service.addSubRoleToSeeker(this.seekerId, k?.roleId)
      .subscribe(() => this.router.navigate(['/employees-role']), (err) => { });
  }

  get f() {
    return this.form.controls;
  }
}
