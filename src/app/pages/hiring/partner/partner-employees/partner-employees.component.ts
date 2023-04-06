import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OwnerDetails, Registration, OwnerStatusUpdate } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { IOwnerDetails } from 'src/app/core/models';
import { HiringService } from '../../hiring.service';

@Component({
  selector: 'app-partner-employees',
  templateUrl: './partner-employees.component.html',
  styleUrls: ['./partner-employees.component.scss']
})
export class PartnerEmployeesComponent implements OnInit, AfterViewInit {
  owners: MatTableDataSource<IOwnerDetails> = new MatTableDataSource<IOwnerDetails>([]);
  owners$!: Observable<any>; //Intentionally kept it to <any> because of the search pipe used in DOM.
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  nullish = [null, undefined, '', 'null', 'null,null', 'null+'];
  user: Registration;
  rateValue: number = 0;
  _search: string = '';
  pageOptions = { length: 0, size: 10, sizeOptions: [5, 10, 25, 100] };

  constructor(
    private readonly router: Router,
    private readonly _appService: AppService,
    private readonly _service: HiringService) {
    this.user = this._appService.user;
  }

  ngOnInit(): void {
    this.owners$ = this.owners.connect();
    this.getOwners();
  }

  ngAfterViewInit(): void {
    this.owners.paginator = this.paginator;
    this.owners.filterPredicate = (data: OwnerDetails, filter: string) => this._appService._searchFilter(data, filter, ['location', 'employeeName']);
  }

  getOwners(): void {
    const id = this.user?.id;
    if (!id) return;

    this._service.getOwners(id)
      .subscribe((j) => {
        this.owners.data = j;
      }, (err) => {
        // this._appService.toastr(err);
      });
  }

  async changeStatus(n: OwnerDetails): Promise<void> {
    const j: OwnerStatusUpdate = {
      isAccountActive: !n?.status,
      skillOwnerId: n?.employeeId,
    };

    const m = {
      before: n?.status ? 'Active' : 'Inactive',
      after: n?.status ? 'Inactive' : 'Active'
    };

    const ii = await this._appService.confirmation(
      'Are you sure?', `The status will be changed from ${m.before} to ${m.after}`,
      { showCancelButton: true }
    );
    if (!ii) return;

    this._service.skillOwnerStatusUpdate(j)
      .subscribe((res) => {
        this._appService.toastr(`The status of the ${n?.employeeName} is updated successfully`, { icon: 'success' });
        this._appService.timeout().then(() => window.location.reload());
      }, (err) => this._appService.toastr(err));
  }

  navigate(url: string, j?: Object): void {
    this.router.navigate([url], { queryParams: { ...(j) && { ...j } } });
  }

  editRate(n: IOwnerDetails, index: number) {
    this.owners.data?.forEach(e => e.editable = false);
    n.editable = true;
    this.rateValue = n?.rate as number;
  }

  updateRate(n: IOwnerDetails, index: number) {
    const req = { skillOwnerId: n?.employeeId, rate: this.rateValue, };
    this._service.skillOwnerRateUpdate(req)
      .subscribe(() => {
        n.editable = false;
        n.rate = this.rateValue;
      }, (err) => {
        this._appService.toastr(err);
      });
  }

  searchFn(e: Event): void {
    let j = (e?.target as HTMLInputElement)?.value?.trim();
    j = j?.toLowerCase();
    this.owners.filter = j;
    this.paginator?.firstPage();
  }


}
