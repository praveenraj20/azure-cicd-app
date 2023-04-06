import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { isAfter, isEqual, isFuture } from 'date-fns';
import { filter, first, Observable } from 'rxjs';
import {
  FeedbackRate,
  RejectCandidateDto,
  RequirementPhase,
  SeekerModulesEntity,
  SelectionPhaseResponse,
} from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { ProcessService } from '../../../process.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit, AfterViewInit {
  jobId!: string;
  jobTitle!: string;
  isLocked: boolean = true;
  subRole!: number;
  candidates: MatTableDataSource<ISelectionPhaseResponse> =
    new MatTableDataSource<ISelectionPhaseResponse>([]);
  candidates$!: Observable<ISelectionPhaseResponse[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageOptions = { length: 0, size: 10, sizeOptions: [5, 10, 25, 100] };

  permissions = {
    scheduling: false,
    sow: false,
    po: false,
    msa: false,
    reject: false,
    updateInterview: false,
  };
  form!: FormGroup;
  process: IProcess[] = [
    { item: 'Written Test', value: 0, color: '#93cc65' },
    { item: 'Coding Round', value: 0, color: '#cc7a65' },
    { item: 'Technical Interview', value: 0, color: '#00FFFF' },
    { item: 'HR Interview', value: 0, color: '#bf84ee' },
    { item: 'Hiring Manager Review', value: 0, color: '#df5bab' },
    { item: 'Behavioral Assesment', value: 0, color: '#5cc0a2' },
    { item: 'Bar Raiser', value: 0, color: '#4885ed' },
  ];
  editInfo!: ISelectionPhaseResponse;
  _edit: boolean = false;
  toggleSidebar: boolean = false;
  dialogConfig: string = '';
  rating_Value: FeedbackRate[] = [];

  constructor(
    private readonly _appService: AppService,
    private readonly _service: ProcessService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.candidates$ = this.candidates?.connect();
    this.subRole = this._appService.user?.subRoles as number;
    this.updatePermissions();
    this.feedback();

    this.form = this.fb.group({
      ratings: [null, [Validators.required]],
      feedback: [null, [Validators.required]],
    });

    this.route.queryParams
      .pipe(
        filter((e) => !!e && !!e?.jobId),
        first()
      )
      .subscribe((e) => {
        this.jobId = e?.jobId;
        this.getCandidates(this.jobId);
      });
  }

  ngAfterViewInit(): void {
    this.candidates.paginator = this.paginator;
  }

  updatePermissions(): void {
    const moduleAccess = this._appService.user?.modulesAccess ?? [];

    this.permissions.scheduling =
      moduleAccess?.some((e) => e?.seekerModule === 'Interview Scheduling') ??
      false;
    this.permissions.sow =
      moduleAccess?.some((e) => e?.seekerModule === 'Creation of SOW') ?? false;
    this.permissions.po =
      moduleAccess?.some((e) => e?.seekerModule === 'Creation of PO') ?? false;
    this.permissions.msa =
      moduleAccess?.some((e) => e?.seekerModule === 'Creation of MSA') ?? false;
    this.permissions.reject =
      moduleAccess?.some((e) => e?.seekerModule === 'Reject Candidate') ??
      false;
    this.permissions.updateInterview =
      moduleAccess?.some(
        (e) => e?.seekerModule === 'Updating Interview Feedback'
      ) ?? false;
  }

  getCandidates(jobId: string): void {
    this._service.getCandidatesByJobId(jobId).subscribe(
      (j) => {
        const k: ISelectionPhaseResponse[] = j ?? [];
        this.candidates.data = k;
        this.jobTitle = k[0]?.jobTitle ?? '';
        try {
          k?.forEach((e) => {if(e?.currentStage! > 1){
            this.isLocked=false;
          }})
          k?.forEach(async (e) => {
            const k = await this._service
              .getById(e?.skillOwnerId as number)
              .toPromise();
            e?.rate === null ? (e.rate = k?.rateCard ?? 0) : null;
            e.avatar = await this._appService.defaultAvatar(
              e?.skillOwnerId as number
            );
          });
        } catch (e) {}
      },
      (err) => {}
    );
  }

  notifications(n: SelectionPhaseResponse): void {
    this.router.navigate(['/notifications/jobs'], {
      queryParams: { jobId: n?.jobId, empId: n?.skillOwnerId },
    });
  }

  createMsa(n: SelectionPhaseResponse): void {
    this.router.navigate(['/process/msa'], {
      queryParams: { jobId: n?.jobId, ownerId: n?.skillOwnerId },
    });
  }

  updateRequirementPhase():void {
    this.router.navigate(['/process/define'], { queryParams: { jobId: this.jobId } })
  }

  reinitiate(n: SelectionPhaseResponse): void {
    const j = {
      showCancelButton: true,
      confirmButtonText: 'Yes, Re-initiate it',
    };
    this._appService
      .confirmation('Are you sure?', `You won't be able to revert this!`, j)
      .then((e) => {
        if (!e) return;

        this._service
          .reInitiateHiring(n?.jobId as string, n?.skillOwnerId as number)
          .subscribe(
            () => {
              this._appService.toastr(
                'Selection progress reinitiated successfully',
                { icon: 'success' }
              );
              this._appService
                .timeout(2000)
                .then(() => window.location?.reload());
            },
            (err) => this._appService.toastr(err)
          );
      });
  }

  reject(n: SelectionPhaseResponse): void {
    const j = { showCancelButton: true, confirmButtonText: 'Yes, Reject it' };
    this._appService
      .confirmation('Are you sure?', `You won't be able to revert this!`, j)
      .then((e) => {
        if (!e) return;

        const k: RejectCandidateDto = {
          jobId: n?.jobId,
          skillOwnerId: n?.skillOwnerId,
          stage: n?.currentStage,
        };
        this._service.rejectCandidate(k).subscribe(
          () => {
            this._appService.toastr('Candidate is rejected', {
              icon: 'success',
            });
            this._appService
              .timeout(2000)
              .then(() => window.location?.reload());
          },
          (err) => this._appService.toastr(err)
        );
      });
  }

  reschedule(n: SelectionPhaseResponse): void {
    const date = new Date();

    const phase = (n?.requirementPhaseList as RequirementPhase[]) ?? [];
    const _date = new Date(
      `${phase[(n?.currentStage as number) - 1]?.dateOfInterview},${
        phase[(n?.currentStage as number) - 1]?.endTimeOfInterview
      }`
    );
    if (phase[(n?.currentStage as number) - 1]?.dateOfInterview) {
      if (isFuture(_date)) {
        this._appService.toastr(
          `The date ${this.datePipe.transform(
            _date,
            'M/d/yy, hh:mm a'
          )} is for the Round - ${
            phase[(n?.currentStage as number) - 1]?.requirementPhaseName
          }. Please make sure its greater than ${this.datePipe.transform(
            date,
            'M/d/yy, h:mm a'
          )}.`
        );
        return;
      }
    }

    this._service
      .selectedForRound(
        n?.jobId as string,
        n?.skillOwnerId as number,
        (n?.currentStage as number) - 1
      )
      .subscribe(
        () => {
          this._appService.toastr('Candidate is rejected', { icon: 'success' });
          this._appService.timeout(2000).then(() => window.location?.reload());
        },
        (err) => this._appService.toastr(err)
      );
  }

  clearedRound(n: SelectionPhaseResponse): void {
    const date = new Date();

    const phase = (n?.requirementPhaseList as RequirementPhase[]) ?? [];
    const _date = new Date(
      `${phase[(n?.currentStage as number) - 1]?.dateOfInterview},${
        phase[(n?.currentStage as number) - 1]?.endTimeOfInterview
      }`
    );
    if (phase[(n?.currentStage as number) - 1]?.dateOfInterview) {
      if (isFuture(_date)) {
        this._appService.toastr(
          `The date ${this.datePipe.transform(
            _date,
            'M/d/yy, hh:mm a'
          )} is for the Round - ${
            phase[(n?.currentStage as number) - 1]?.requirementPhaseName
          }. Please make sure its greater than ${this.datePipe.transform(
            date,
            'M/d/yy, h:mm a'
          )}.`
        );
        return;
      }
    }

    this._service
      .selectedForRound(
        n?.jobId as string,
        n?.skillOwnerId as number,
        n?.currentStage as number
      )
      .subscribe(
        () => {
          this._appService.toastr(
            `Cleared ${
              (n?.requirementPhaseList as RequirementPhase[])[
                (n?.currentStage as number) - 1
              ]?.requirementPhaseName
            } successfully`,
            { icon: 'success' }
          );
          this._appService.timeout(2000).then(() => window.location?.reload());
        },
        (err) => this._appService.toastr(err)
      );
  }

  _clearedRound(n: SelectionPhaseResponse): void {
    const date = new Date();

    const phase = (n?.requirementPhaseList as RequirementPhase[]) ?? [];
    const _date = new Date(
      `${phase[(n?.currentStage as number) - 1]?.dateOfInterview},${
        phase[(n?.currentStage as number) - 1]?.endTimeOfInterview
      }`
    );
    if (phase[(n?.currentStage as number) - 1]?.dateOfInterview) {
      if (isFuture(_date)) {
        this._appService.toastr(
          `The date ${this.datePipe.transform(
            _date,
            'M/d/yy, hh:mm a'
          )} is for the Round - ${
            phase[(n?.currentStage as number) - 1]?.requirementPhaseName
          }. Please make sure its greater than ${this.datePipe.transform(
            date,
            'M/d/yy, h:mm a'
          )}.`
        );
        return;
      }
    }

    this._service
      .rescheduleForRound(
        n?.jobId as string,
        n?.skillOwnerId as number,
        (n?.currentStage as number)
      )
      .subscribe(
        () => {
          this._appService.toastr(
            `Rescheduled ${
              (n?.requirementPhaseList as RequirementPhase[])[
                (n?.currentStage as number) - 1
              ]?.requirementPhaseName
            } successfully`,
            { icon: 'success' }
          );
          this._appService.timeout(2000).then(() => window.location?.reload());
        },
        (err) => this._appService.toastr(err)
      );
  }

  viewSelection(n: SelectionPhaseResponse, edit?: boolean): void {
    this.editInfo = n;
    this._edit = edit ?? false;
    this.toggleSidebar = true;
  }

  _close(): void {
    this.toggleSidebar = false;
    this._edit = false;
    this.editInfo = null as any;
  }

  pageChange(e: PageEvent): void {}

  dialog() {
    this.dialogConfig = 'rateAndFeedback';
  }

  feedback() {
    this._service.feedback().subscribe((res) => {
      this.rating_Value = res;
    });
  }

  onFinal(n: SelectionPhaseResponse) {
    const date = new Date();
    const phase = (n?.requirementPhaseList as RequirementPhase[]) ?? [];
    const _date = new Date(
      `${phase[(n?.currentStage as number) - 1]?.dateOfInterview},${
        phase[(n?.currentStage as number) - 1]?.endTimeOfInterview
      }`
    );
    if (phase[(n?.currentStage as number) - 1]?.dateOfInterview) {
      if (isFuture(_date)) {
        this._appService.toastr(
          `The date ${this.datePipe.transform(
            _date,
            'M/d/yy, hh:mm a'
          )} is for the Round - ${
            phase[(n?.currentStage as number) - 1]?.requirementPhaseName
          }. Please make sure its greater than ${this.datePipe.transform(
            date,
            'M/d/yy, h:mm a'
          )}.`
        );
        return;
      }
    }

    let req = {
      jobId: n?.jobId,
      skillOwnerId: n?.skillOwnerId,
      stage: n?.currentStage,
      candidatePercentage: {
        id: this.form.value.ratings.id,
      },
      feedback: this.form.value.feedback,
    };
    this._service.updateDetailsForParticularRound(req).subscribe(
      (res) => {
        this._appService.toastr('Details has been updated successfully', {
          icon: 'success',
        });
        this.clearedRound(n);
      },
      (err) => this._appService.toastr(err)
    );
  }
}

interface IProcess {
  item: string;
  value: number;
  color: string;
}

interface ISelectionPhaseResponse extends SelectionPhaseResponse {
  avatar?: string;
}
