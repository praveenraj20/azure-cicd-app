import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Observable } from 'rxjs';
import { Contracts, ContractStatus } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { ContractsService } from '../../contracts.service';

@Component({
  selector: 'app-seeker-contracts',
  templateUrl: './seeker-contracts.component.html',
  styleUrls: ['./seeker-contracts.component.scss'],
  providers: [DatePipe],
})
export class SeekerContractsComponent implements OnInit, AfterViewInit {
  _search: string = '';
  filterOptions: IFilterOption[] = [
    { label: 'Status', value: 'status' },
    { label: 'Partner', value: 'partner' },
    { label: 'Position', value: 'position' },
    { label: 'Date Signed', value: 'dateSigned' },
  ];
  _filterSelection: string = 'status';
  filterStatus: IFilterStatus[] = [];
  filterPartner: IFilterStatus[] = [];
  filterPosition: IFilterStatus[] = [];
  bsConfig: Partial<BsDatepickerConfig> = {
    isAnimated: true,
    dateInputFormat: 'MM/DD/YYYY',
    containerClass: 'theme-dark-blue',
  };
  selectedDate: string = '';
  contracts: MatTableDataSource<IContracts> =
    new MatTableDataSource<IContracts>([]);
  originalContracts: MatTableDataSource<IContracts> =
    new MatTableDataSource<IContracts>([]);
  contracts$!: Observable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageOptions = { length: 0, size: 10, sizeOptions: [5, 10, 25, 100] };
  departments: string[] = [];
  contractStatus: ContractStatus[] = [];
  ownerInfo!: IContracts;
  _view: boolean = false;
  _permission = { sow: false, contracts: false, po: false };

  constructor(
    private readonly _service: ContractsService,
    private readonly _appService: AppService,
    private readonly router: Router,
    private readonly datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.contracts$ = this.contracts?.connect();
    this.permissions();
    this.getContracts();
    this.getContractStatus();
  }

  ngAfterViewInit(): void {
    this.contracts.paginator = this.paginator;
    this.contracts.filterPredicate = (data: IContracts, filter: string) => this._appService._searchFilter(data, filter, ['name', 'position', 'seekerName', 'status']);
  }

  getContracts(): void {
    const id = this._appService.user?.id;
    if (!id) return;

    this._service.getSeekerContracts(id).subscribe(
      (j) => {
        this.contracts.data = j ?? [];
        this.originalContracts.data = j ?? [];
        this.contracts?.data?.forEach(async (e) => {
          e.avatar = await this._appService.defaultAvatar(e?.ownerId as number);
          const newStatus = { label: e?.status!, checked: false };
          const objectStatus = this.filterStatus.find((object) => {
            return object.label === e?.status!;
          });
          if (objectStatus === undefined) {
            this.filterStatus.push(newStatus);
          }
          const newPosition = { label: e?.position!, checked: false };
          const objectPosition = this.filterPosition.find((object) => {
            return object.label === e?.position!;
          });
          if (objectPosition === undefined) {
            this.filterPosition.push(newPosition);
          }
          const newSeeker = { label: e?.partner!, checked: false };
          const objectSeeker = this.filterPartner.find((object) => {
            return object.label === e?.partner!;
          });
          if (objectSeeker === undefined) {
            this.filterPartner.push(newSeeker);
          }
        });
        this.pageOptions.length = j?.length;
      },
      (err) => this._appService.toastr(err)
    );
  }

  getContractStatus(): void {
    this._service.getContractStatus().subscribe(
      (j) => {
        this.contractStatus = j ?? [];
      },
      (err) => { }
    );
  }

  updateMsa(n: IContracts, m: ContractStatus): void {
    this._service.updateMsaStatus(n?.msaId as number, m.id as number).subscribe(
      (j) => {
        this._appService.toastr(`MSA ${m?.status} successfully`, {
          icon: 'success',
        });
        this.getContracts();
      },
      (err) => this._appService.toastr(err)
    );
  }

  navigate(url: string, n: IContracts): void {
    this.router.navigate([url], {
      queryParams: { id: n?.ownerId, jobId: n?.jobId,projectId:n?.projectId },
    });
  }

  openView(n: IContracts): void {
    this.ownerInfo = n;
    this._view = true;
  }

  closeView(): void {
    this._view = false;
    this.ownerInfo = {} as IContracts;
  }

  filterSelection(n: IFilterOption): void {
    this._filterSelection = n?.value;
  }

  searchFn(e: Event): void {
    let j = (e?.target as HTMLInputElement)?.value?.trim();
    j = j?.toLowerCase();
    this.contracts.filter = j;
    this.paginator?.firstPage();
  }
  filterReset(): void {
    this.contracts.data = this.originalContracts.data;
    this.selectedDate = '';

  }

  filterStatusChange(e: Event, n: IFilterStatus): void {
    n.checked = (e?.target as HTMLInputElement)?.checked;
  }

  filterPositionChange(e: Event, n: IFilterStatus): void {
    n.checked = (e?.target as HTMLInputElement)?.checked;
  }

  filterSeekerChange(e: Event, n: IFilterStatus): void {
    n.checked = (e?.target as HTMLInputElement)?.checked;
  }

  applyFilter(): void {
    this.contracts.data = this.originalContracts.data;
    const FilterStatus = this.filterStatus;
    const FilterPosition = this.filterPosition;
    const filterPartner = this.filterPartner;
    const booleanStatus = this.filterStatus?.some((e) => { return e?.checked });
    const booleanPosition = this.filterPosition?.some((e) => { return e?.checked });
    const booleanPartner = this.filterPartner?.some((e) => { return e?.checked });
    const date = this.selectedDate;
    const newContractData = this.contracts?.data.filter(function (el) {
      if (booleanStatus && booleanPosition && booleanPartner) {
        return (
          FilterStatus?.some((f) => {
            return f?.label === el?.status && f?.checked;
          }) &&
          FilterPosition?.some((f) => {
            return f?.label === el?.position && f?.checked;
          }) &&
          filterPartner?.some((f) => {
            return f.label === el?.partner && f?.checked;
          })
        );
      } else if (booleanStatus && booleanPosition) {
        return (
          FilterStatus?.some((f) => {
            return f?.label === el?.status && f?.checked;
          }) &&
          FilterPosition?.some((f) => {
            return f?.label === el?.position && f?.checked;
          })
        );
      } else if (booleanStatus && booleanPartner) {
        return (
          FilterStatus?.some((f) => {
            return f?.label === el?.status && f?.checked;
          }) &&
          filterPartner?.some((f) => {
            return f.label === el?.partner && f?.checked;
          })
        );
      } else if (booleanPosition && booleanPartner) {
        return (
          FilterPosition?.some((f) => {
            return f?.label === el?.position && f?.checked;
          }) &&
          filterPartner?.some((f) => {
            return f.label === el?.partner && f?.checked;
          })
        );
      } else if (booleanStatus) {
        return FilterStatus?.some((f) => {
          return f?.label === el?.status && f?.checked;
        });
      } else if (booleanPosition) {
        return FilterPosition?.some((f) => {
          return f?.label === el?.position && f?.checked;
        });
      } else if (booleanPartner) {
        return filterPartner?.some((f) => {
          return f.label === el?.partner && f?.checked;
        });
      }
    });
    const newContractDateFilterData = (booleanStatus || booleanPosition || booleanPartner) ? newContractData.filter((el) => {
      const startDate = this.datePipe.transform(el?.onBoarding, 'yyyy-MM-dd');
      const endDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      if (startDate !== null && endDate !== null && startDate > endDate) {
        return el;
      }
    }) : this.contracts.data.filter((el) => {
      const startDate = this.datePipe.transform(el?.onBoarding, 'yyyy-MM-dd');
      const endDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      if (startDate !== null && endDate !== null && startDate > endDate) {
        return el;
      }
    });
    this.contracts.data =
      this.selectedDate.length !== 0 ? newContractDateFilterData : newContractData;
  }

  permissions(): void {
    const modules = this._appService.user?.modulesAccess ?? [];
    const contracts = modules?.some((e) => e?.seekerModule === 'Contract');
    const sow = modules?.some((e) => e?.seekerModule === 'Creation of SOW');
    const po = modules?.some((e) => e?.seekerModule === 'Creation of PO');

    this._permission = { contracts, sow, po };
    !contracts
      ? (this.router.navigateByUrl('/dashboard'),
        this._appService.toastr(
          'The selected module is restricted for you. Please contact your Seeker Admin'
        ))
      : null;
  }
}

interface IContracts extends Contracts {
  avatar?: string;
}

interface IFilterOption {
  label: string;
  value: string;
}

interface IFilterStatus {
  label: string;
  checked: boolean;
}
