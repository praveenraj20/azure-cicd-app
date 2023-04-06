import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isBefore } from 'date-fns';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { filter, first } from 'rxjs';
import { Contracts } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { ContractsService } from '../../contracts.service';

@Component({
  selector: 'app-seeker-onboarding',
  templateUrl: './seeker-onboarding.component.html',
  styleUrls: ['./seeker-onboarding.component.scss']
})
export class SeekerOnboardingComponent implements OnInit {
  id!: string;
  form!: FormGroup;
  readonly date: Date = new Date();
  readonly status: any[] = [
    { label: 'PO Released', hidden: true },
    { label: 'SOW Released', hidden: true },
    { label: 'Expiring soon', hidden: true },
    { label: 'On-Boarded', hidden: false },
    { label: 'Active', hidden: false },
    { label: 'In-Active', hidden: false },
    { label: 'On-Hold', hidden: false }
  ];
  readonly bsConfig: Partial<BsDatepickerConfig> = { isAnimated: true, dateInputFormat: 'MM/DD/YYYY', containerClass: 'theme-dark-blue' };
  contractInfo!: Contracts;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly _service: ContractsService,
    private readonly _appService: AppService,
    private readonly fb: FormBuilder,
    private readonly datePipe: DatePipe,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.defaultsInit();

    this.route.queryParams
      .pipe(filter(e => !!e && !!e?.id), first())
      .subscribe(e => {
        this.id = e?.id;
        this.getContractInfo();
      });
  }

  defaultsInit(): void {
    this.form = this.fb.group({
      'projectName': [{ value: null, disabled: true }, [Validators.required]],
      'name': [null, [Validators.required]],
      'status': [null, [Validators.required]],
      'startDate': [null, [Validators.required]],
      'endDate': [null, [Validators.required]],
    });

    const start = this.form.get('startDate');
    const end = this.form.get('endDate');

    end?.valueChanges
      .pipe()
      .subscribe(() => {
        const k = isBefore(new Date(start?.value), new Date(end?.value));
        k ? end?.setErrors(null) : end?.setErrors({ invalidSelection: true });
      });
  }

  getContractInfo(): void {
    const id = this._appService.user?.id;
    if (!id) return;

    this._service.getSeekerContracts(id)
      .subscribe((j) => {
        const i = j?.findIndex(e => e?.ownerId === parseInt(this.id)) ?? -1;
        if (i === -1) return;

        this.contractInfo = j[i];

        this.form.patchValue({
          status: this.contractInfo?.status,
          projectName: this.contractInfo?.projectName,
          name: this.contractInfo?.name,
          startDate: this.datePipe.transform(this.contractInfo?.contractDurationStartDate, 'MM-dd-YYYY'),
          endDate: this.datePipe.transform(this.contractInfo?.contractDurationEndDate, 'MM-dd-YYYY'),
        });
      }, (err) => this._appService.toastr(err));
  }

  submit(): void {
    if (!this.form?.valid) return;

    const a = this.form.getRawValue();
    Object.assign(a, {
      seekerId: this.contractInfo?.seekerId,
      skillOwnerEntityId: this.id,
      projectId: this.contractInfo?.projectId,
      startDate: this._appService.convertTime(a?.startDate),
      endDate: this._appService.convertTime(a?.endDate),
    });

    this._service.onBoarding(a)
      .subscribe((n) => {
        this._appService.toastr('Details updated successfully', { icon: 'success' });
        this.router.navigateByUrl('/contracts');
      }, (err) => this._appService.toastr(err));
  }

  get f() {
    return this.form.controls;
  }

}
