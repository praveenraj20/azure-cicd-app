import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SeekerStatusUpdate, SkillSeeker } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { EmployeesRoleService } from '../../employees-role.service';

@Component({
  selector: 'app-seeker-list',
  templateUrl: './seeker-list.component.html',
  styleUrls: ['./seeker-list.component.scss']
})
export class SeekerListComponent implements OnInit, AfterViewInit {
  _search: string = '';
  employees: MatTableDataSource<SkillSeeker> = new MatTableDataSource<SkillSeeker>([]);
  employees$!: Observable<any> //Intentionally keep this as a any, because we have search pipe so it will throw a error.
  pageOptions = { length: 0, size: 10, sizeOptions: [5, 10, 25, 100] };
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly router: Router,
    private readonly _service: EmployeesRoleService,
    private readonly _appService: AppService) { }

  ngOnInit(): void {
    this.employees$ = this.employees?.connect();
    this.getSeekerById();
  }

  ngAfterViewInit(): void {
    this.employees.paginator = this.paginator;
    this.employees.filterPredicate = (data: SkillSeeker, filter: string) => this._appService._searchFilter(data, filter, ['skillSeekerName', 'state', 'city']);
  }

  getSeekerById(): void {
    const taxId = this._appService.user?.taxIdBusinessLicense as string;
    if (!taxId) return;

    this._service.getSeekerById(taxId)
      .subscribe((j) => {
        this.employees.data = j;
        this.pageOptions.length = j?.length ?? 0;
      }, (err) => { })
  }

  userMapping(n: SkillSeeker): void {
    this.router.navigate(['employees-role/map'], {
      queryParams: { seekerId: n?.id, seekerName: n?.skillSeekerName, emailId: n?.email, roleId: n?.subRoles?.id ?? null },
    });
  }

  async changeStatus(n: SkillSeeker): Promise<void> {
    const j: SeekerStatusUpdate = {
      isAccountActive: !n?.active,
      skillSeekerId: n?.id,
    };

    const m = {
      before: n?.active ? 'Active' : 'Inactive',
      after: n?.active ? 'Inactive' : 'Active'
    };

    const ii = await this._appService.confirmation(
      'Are you sure?', `The status will be changed from ${m.before} to ${m.after}`,
      { showCancelButton: true }
    );
    if (!ii) return;

    this._service.updateSeekerStatus(j)
      .subscribe((res) => {
        this._appService.toastr(`The status of the ${n?.skillSeekerName} is updated successfully`, { icon: 'success' });
        this.getSeekerById();
      }, (err) => this._appService.toastr(err));
  }
  searchFn(e: Event): void {
    let j = (e?.target as HTMLInputElement)?.value?.trim();
    j = j?.toLowerCase();
    this.employees.filter = j;
    this.paginator?.firstPage();
  }

}
