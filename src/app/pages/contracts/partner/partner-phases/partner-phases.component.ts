import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequirementPhases, ContractDetails } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { ContractsService } from '../../contracts.service';

@Component({
  selector: 'app-partner-phases',
  templateUrl: './partner-phases.component.html',
  styleUrls: ['./partner-phases.component.scss']
})
export class PartnerPhasesComponent implements OnInit {
  @Input() id!: number;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  contractInfo!: IContractDetails;
  phases: RequirementPhases[] = [];

  constructor(
    private readonly _service: ContractsService,
    private readonly _appService: AppService) { }

  ngOnInit(): void {
    this.getContractDetails();
  }

  getContractDetails(): void {
    if (!this.id) return;

    this._service.getContractDetails(this.id)
      .subscribe(async (j) => {
        this.contractInfo = j[0] ?? {} as ContractDetails;
        this.phases = this.contractInfo?.requirementPhaseList ?? [];
        this.contractInfo.avatar = await this._appService.defaultAvatar(this.id as number);
      }, (err) => this._appService.toastr(err));
  }

  downloadSow(): void {
    if (!this.contractInfo?.sowId) return;

    this._service.downloadSow(this.contractInfo?.sowId)
      .subscribe((j) => {
        this.downloadFn(j?.fileDownloadUri as string);
      }, (err) => this._appService.toastr(err));
  }

  downloadMsa(): void {
    if (!this.contractInfo?.msaId) return;

    this._service.downloadMsa(this.contractInfo?.msaId)
      .subscribe((j) => {
        this.downloadFn(j?.fileDownloadUri as string);
      }, (err) => this._appService.toastr(err));
  }

  downloadPo(): void {
    if (!this.contractInfo?.poId) return;

    this._service.downloadPo(this.contractInfo?.poId)
      .subscribe((j) => {
        this.downloadFn(j?.fileDownloadUri as string);
      }, (err) => this._appService.toastr(err));
  }

  downloadFn(url: string): void {
    if (!url) return;

    const anchor = document.createElement('a');
    anchor?.setAttribute('style', 'display: none');
    anchor.href = url;
    anchor.download = url;
    anchor?.click();
    anchor?.remove();
  }

  _close(): void {
    this.close.emit(true);
  }

  getMsaStatus = (n: RequirementPhases): boolean => n?.requirementPhaseName?.includes('MSA') ? true : false;

  getSowStatus = (n: RequirementPhases): boolean => n?.requirementPhaseName?.includes('SOW') ? true : false;

  getPoStatus = (n: RequirementPhases): boolean => n?.requirementPhaseName?.includes('PO') ? true : false;
}

interface IContractDetails extends ContractDetails {
  avatar?: string;
}
