import { DatePipe } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addHours, isSameDay, isValid } from 'date-fns';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FeedbackRate, LocalTime, RequirementPhase, RequirementPhaseDetailsDto, SelectionPhaseResponse } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { ProcessService } from '../../../process.service';

@Component({
  selector: 'app-progress-edit',
  templateUrl: './progress-edit.component.html',
  styleUrls: ['./progress-edit.component.scss']
})
export class ProgressEditComponent implements OnInit, AfterViewChecked {
  @Input() info!: SelectionPhaseResponse;
  selection!: ISelectionPhaseResponse;
  viewSelection: boolean = true;
  date: Date = new Date();
  stages: number[] = [];
  bsConfig: Partial<BsDatepickerConfig> = { isAnimated: true, dateInputFormat: 'MM-DD-YYYY', containerClass: 'theme-dark-blue' };
  interviewModes: string[] = ['Remote', 'Face To Face'];
  form!: FormGroup;
  timePicker: boolean = false;
  minDate!: Date;
  rating_Value:FeedbackRate[]=[]

  constructor(
    private readonly _service: ProcessService,
    private readonly _appService: AppService,
    private readonly fb: FormBuilder,
    private readonly datePipe: DatePipe,
    private readonly cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.init();
    this.feedback();

    this.form = this.fb.group({
      stage: [null, [Validators.required]],
      dateOfInterview: [null, [Validators.required]],
      timePicker: [null, [Validators.required]],
      _timePicker: [null, [Validators.required]],
      interviewedBy: [null, [Validators.required]],
      ratings: [null, [Validators.required]],
      feedback: [null, [Validators.required]],
      modeOfInterview: [null, [Validators.required]],
    });
  }

  ngAfterViewChecked(): void {
    this.cdr?.detectChanges();
  }

  init(): void {
    const { jobId, skillOwnerId } = this.info;
    if (!jobId || !skillOwnerId) return;

    this.getInterviewInfo(jobId, skillOwnerId);
  }

  getInterviewInfo(jobId: string, ownerId: number): void {
    this.viewSelection = true;
    this._service.interviewInfo(jobId, ownerId)
      .subscribe(async (j) => {
        this.selection = j;
        this.stages = [];

        Array((j?.currentStage as number) - 1)?.fill('')?.forEach((e, i) => {
          if (j?.currentStage === 1) return (j?.requirementPhaseList as Array<RequirementPhase>)[0]?.interviewedBy === 'Skill Seeker'
            ? this.stages.push(i + 1) : null;

          this.stages.push(i + 1);
        });
        try {
          this.selection.avatar = await this._appService.defaultAvatar(j?.skillOwnerId as number);
        } catch (e) { }
      }, (err) => {

      });
  }

  stageSelection(event: Event): void {
    const k = (event?.target as HTMLInputElement)?.value ?? null;
    if (!k) return;

    const i = this.selection?.requirementPhaseList?.findIndex(e => parseInt(k) == e?.stage) ?? -1;
    if (i === -1) return;

    const e = (this.selection.requirementPhaseList as RequirementPhase[])[i];

    const date = `${e?.dateOfInterview},${e?.timeOfInterview}`,
      _date = `${e?.dateOfInterview},${e?.endTimeOfInterview}`;

    const ii = {
      interviewedBy: e?.interviewedBy,
      modeOfInterview: e?.modeOfInterview,
      feedback: e?.feedback,
      percentage: (e as any)?.candidatePercentage,
      ...(e?.dateOfInterview) && {
        dateOfInterview: new Date(e?.dateOfInterview),
        timePicker: this.datePipe.transform(date, 'M-d-yy, h:mm a'),
        _timePicker: this.datePipe.transform(_date, 'M-d-yy, h:mm a'),
      }
    };
    this.form.patchValue({ ...ii });
  }

  updateProcess(): void {
    if (!this.form?.valid || !this.selection) return;

    const { value } = this.form;
    const ii = this.selection;
    const k = {
      jobId: ii?.jobId,
      skillOwnerId: ii?.skillOwnerId,
      stage: value?.stage,
      interviewedBy: value?.interviewedBy,
      candidatePercentage: value?.ratings,
      dateOfInterview: this.datePipe.transform(value?.dateOfInterview, 'yyyy-MM-dd') as string,
      timeOfInterview: this.datePipe.transform(value?.timePicker, 'HH:mm') as LocalTime,
      endTimeOfInterview: this.datePipe.transform(value?._timePicker, 'HH:mm') as LocalTime,
      modeOfInterview: value?.modeOfInterview,
      feedback: value?.feedback,
    };

    this._service.updateDetailsForParticularRound(k)
      .subscribe((j) => {
        this._appService.toastr('Details has been updated successfully', { icon: 'success' });
        this._appService.timeout(2000).then(() => window.location?.reload());
      }, (err) => this._appService.toastr(err))
  }

  dateHandler(i: number): void {
    if (i === 1 && isSameDay(this.form.get('dateOfInterview')?.value, this.date)) {
      this.timePicker = true;
    }

    if (!this.timePicker) {
      this.minDate = addHours(new Date(), 8)
    }
  }

  timeIsValid(n: boolean): void {
    const k = new Date(this.form.get('timePicker')?.value)
    this.minDate = isValid(k) ? k : new Date();
  }

  onlyNumber(e: KeyboardEvent): void {
    this._appService.onlyNumber(e);
  }

  feedback(){
    this._service.feedback().subscribe((res)=>{
      this.rating_Value = res;
    })
  }

}

interface ISelectionPhaseResponse extends SelectionPhaseResponse {
  avatar?: string;
}
