import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, map } from 'rxjs';
import { Registration, SeekerModulesEntity, SubRole, SubRoles } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { EmployeesRoleService } from '../../employees-role.service';

@Component({
  selector: 'app-seeker-add',
  templateUrl: './seeker-add.component.html',
  styleUrls: ['./seeker-add.component.scss']
})
export class SeekerAddComponent implements OnInit {
  user: Registration;
  taxId!: string;
  form!: FormGroup;
  modules: IModuleFx[] = [];
  subroles: SubRoles[] = [];
  status: any[] = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false },
  ];

  constructor(
    private readonly _appService: AppService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly _service: EmployeesRoleService) {
    this.user = this._appService.user;
  }

  ngOnInit(): void {
    this.taxId = this.user?.taxIdBusinessLicense as string;

    this.form = this.fb.group({
      roleId: [null, Validators.required],
      moduleId: [null, Validators.required],
      active: [null, Validators.required],
    });


    this.route.queryParams
      .pipe(
        filter(e => !!e),
        first()
      ).subscribe(e => {
        const j = [] as number[];
        (e?.moduleId as string[])?.forEach(n => !isNaN(parseInt(n)) ? j.push(parseInt(n)) : null)
        this.form.patchValue({
          'roleId': !isNaN(parseInt(e?.roleId)) ? parseInt(e?.roleId) : null,
          'moduleId': j,
          'active': !isNaN(parseInt(e?.status)) ? parseInt(e?.status) > 0 ? true : false : null
        });
      });

    this.getModules();
    this.getSubRoles();
  }

  getModules(): void {
    this._service.getModules()
      .subscribe((j) => {
        const k = this.form.get('moduleId')?.value as number[] ?? [];

        (j as IModuleFx[]).forEach(e => e.checked = k.includes(e?.id as number) ? true : false);
        this.modules = j as IModuleFx[];
      }, (err) => { })
  }

  getSubRoles(): void {
    this._service.getSubRoles()
    .pipe(
      map(j => j?.filter(e => e?.id !== 1)) //Removing the admin role.
    ).subscribe((j) => this.subroles = j, (err) => { })
  }

  addRole(): void {
    if (!this.form.valid) return;

    const { value } = this.form;
    Object.assign(value, { taxId: this.taxId });
    this._service.addSubRole(value as SubRole)
      .subscribe(() => {
        this._appService.toastr('Roles has been updated successfully', { icon: 'success' });
        this.router.navigate(['employees-role/list']);
      }, (err) => this._appService.toastr(err));
  }

  moduleSelect(n: IModuleFx): void {
    n.checked = !n.checked;

    const k = this.modules.filter(e => e.checked);
    const id = k?.map(e => e?.id);
    this.form.get('moduleId')?.setValue(id);
  }

  get _moduleSelect() {
    const k = [] as string[];
    this.modules?.forEach(e => e?.checked ? k.push(e?.seekerModule as string) : null);
    return k?.join(', ');
  }

  get f() {
    return this.form.controls;
  }
}

interface IModuleFx extends SeekerModulesEntity {
  checked: boolean;
}
