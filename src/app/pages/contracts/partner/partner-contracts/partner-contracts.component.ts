import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Observable } from 'rxjs';
import { Contracts, ContractStatus } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { ContractsService } from '../../contracts.service';

@Component({
  selector: 'app-partner-contracts',
  templateUrl: './partner-contracts.component.html',
  styleUrls: ['./partner-contracts.component.scss']
})
export class PartnerContractsComponent implements OnInit, AfterViewInit {
  _search: string = '';
  selectedDate: string = '';
  filterOptions: IFilterOption[] = [
    { label: 'Status', value: 'status' },
    { label: 'Seeker', value: 'seeker' },
    { label: 'Position', value: 'position' },
    { label: 'Date Signed', value: 'dateSigned' },
  ];
  _filterSelection: string = 'status';
  filterStatus: IFilterStatus[] = [];
  filterSeeker: IFilterStatus[] = [];
  filterPosition: IFilterStatus[] = [];
  bsConfig: Partial<BsDatepickerConfig> = { isAnimated: true, dateInputFormat: 'MM/DD/YYYY', containerClass: 'theme-dark-blue' };
  contracts: MatTableDataSource<IContracts> = new MatTableDataSource<IContracts>([]);
  originalContracts: MatTableDataSource<IContracts> =
    new MatTableDataSource<IContracts>([]);
  contracts$!: Observable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageOptions = { length: 0, size: 10, sizeOptions: [5, 10, 25, 100] };
  contractStatus: ContractStatus[] = [];
  ownerInfo!: IContracts;
  _view: boolean = false;

  constructor(
    private readonly _service: ContractsService,
    private readonly _appService: AppService, private readonly datePipe: DatePipe) { }

  ngOnInit(): void {
    this.contracts$ = this.contracts?.connect();
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

    this._service.getContracts(id)
      .subscribe((j) => {
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
          const newSeeker = { label: e?.seekerName!, checked: false };
          const objectSeeker = this.filterSeeker.find((object) => {
            return object.label === e?.seekerName!;
          });
          if (objectSeeker === undefined) {
            this.filterSeeker.push(newSeeker);
          }
        });
        this.pageOptions.length = j?.length;
      }, (err) => {
        // this._appService.toastr(err);
      });
  }

  getContractStatus(): void {
    this._service.getContractStatus()
      .subscribe((j) => {
        this.contractStatus = j ?? [];
      }, (err) => { });
  }

  updateMsa(n: IContracts, m: ContractStatus): void {
    this._service.updateMsaStatus(n?.msaId as number, m.id as number)
      .subscribe((j) => {
        this._appService.toastr(`MSA ${m?.status} successfully`, { icon: 'success' });
        this.getContracts();
      }, (err) => this._appService.toastr(err));
  }

  updateSow(n: IContracts, m: ContractStatus): void {
    this._service.updateSowStatus(n?.sowId as number, m.id as number)
      .subscribe((j) => {
        this._appService.toastr(`SOW ${m?.status} successfully`, { icon: 'success' });
        this.getContracts();
      }, (err) => this._appService.toastr(err));
  }

  updatePos(n: IContracts, m: ContractStatus): void {
    this._service.updatePOStatus(n?.poId as number, m.id as number)
      .subscribe((j) => {
        this._appService.toastr(`PO ${m?.status} successfully`, { icon: 'success' });
        this.getContracts();
      }, (err) => this._appService.toastr(err));
  }

  openView(n: IContracts): void {
    this.ownerInfo = n;
    n.ownerId
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
    const filterSeeker = this.filterSeeker;
    const booleanStatus = this.filterStatus?.some((e) => { return e?.checked });
    const booleanPosition = this.filterPosition?.some((e) => { return e?.checked });
    const booleanSeeker = this.filterSeeker?.some((e) => { return e?.checked });
    const date = this.selectedDate;
    const newContractData = this.contracts?.data.filter(function (el) {
      if (booleanStatus && booleanPosition && booleanSeeker) {
        return (
          FilterStatus?.some((f) => {
            return f?.label === el?.status && f?.checked;
          }) &&
          FilterPosition?.some((f) => {
            return f?.label === el?.position && f?.checked;
          }) &&
          filterSeeker?.some((f) => {
            return f.label === el?.seekerName && f?.checked;
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
      } else if (booleanStatus && booleanSeeker) {
        return (
          FilterStatus?.some((f) => {
            return f?.label === el?.status && f?.checked;
          }) &&
          filterSeeker?.some((f) => {
            return f.label === el?.seekerName && f?.checked;
          })
        );
      } else if (booleanPosition && booleanSeeker) {
        return (
          FilterPosition?.some((f) => {
            return f?.label === el?.position && f?.checked;
          }) &&
          filterSeeker?.some((f) => {
            return f.label === el?.seekerName && f?.checked;
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
      } else if (booleanSeeker) {
        return filterSeeker?.some((f) => {
          return f.label === el?.seekerName && f?.checked;
        });
      }
    });
    const newContractDateFilterData = (booleanStatus || booleanPosition || booleanSeeker) ? newContractData.filter((el) => {
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
