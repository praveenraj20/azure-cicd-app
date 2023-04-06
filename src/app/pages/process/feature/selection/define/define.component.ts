import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first } from 'rxjs';
import { InsertRequirementPhaseDto, RateApprovalDto, SelectionPhaseResponse } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { ProcessService } from '../../../process.service';

@Component({
  selector: 'app-define',
  templateUrl: './define.component.html',
  styleUrls: ['./define.component.scss']
})
export class DefineComponent implements OnInit {
  jobId!: string;
  jobTitle!: string;
  items: IProcess[] = [];
  basket: IProcess[] = [];
  selection: ISelectionPhaseResponse[] = [];
  isLocked: boolean = false;
  _previousStatus: boolean = false;
  _edit: boolean = true;
  add!: string;
  dialogConfig: string = '';

  constructor(
    private readonly _service: ProcessService,
    private readonly _appService: AppService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) {

    this.items = this.getItems();
    this.basket = this.getBasket();
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(filter(e => !!e && !!e?.jobId), first())
      .subscribe(e => {
        this.jobId = e?.jobId;
        this.getIsLocked(this.jobId);
        this.getCandidatesByJobId(this.jobId);
      });
  }

  getIsLocked(jobId: string): void {
    this._service.isLocked(this.jobId)
      .subscribe((res) => {
        this.isLocked = res?.locked as boolean ?? false;
        res?.flow ? this._previousStatus = false : null;
      }, (err) => { });
  }

  getCandidatesByJobId(jobId: string): void {
    this._service.getCandidatesByJobId(jobId)
      .subscribe((j) => {
        const k: ISelectionPhaseResponse[] = j ?? [];
        this.selection = k;
        this.jobTitle = k[0]?.jobTitle ?? '';

        try {
          k?.forEach(async (e) => {
            const k = await this._service.getById(e?.skillOwnerId as number).toPromise();
            e?.rate === null ? e.rate = k?.rateCard ?? 0 : null;
            e.avatar = await this._appService.defaultAvatar(e?.skillOwnerId as number);
          });
        } catch (e) { }
      }, (err) => {

      });
  }

  drop(event: CdkDragDrop<IProcess[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const m = this.items[event?.previousIndex] ?? null;
      const i = this.basket.filter((e) => e?.item === m?.item);
      i?.length === 0
        ? this.basket.splice(event.currentIndex, 0, { ...m })
        : this.basket.splice(event.currentIndex, 0, { ...m, item: `${m?.item} ${i?.length + 1}` });
      // copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }

    let count = 0;
    const { container } = event;
    container?.data?.forEach((e) => {
      if (e?.item === container.data[event?.currentIndex]?.item) {
        count++;
        if (this._previousStatus && event?.currentIndex !== container?.data?.length - 1) {
          container.data[event?.currentIndex] = { ...container.data[event.currentIndex], value: count - 1 };
        } else {
          const n = this.getOccurrence(container.data, { ...container.data[event.currentIndex] }['item']) - 1;
          container.data[event?.currentIndex] = { ...container.data[event?.currentIndex], value: n };
        }
      }
    });
  }

  previousStatus(): void {
    this._service.isLocked(this.jobId)
      .subscribe((res) => {
        const data = res?.flow ?? [];
        const basket: IProcess[] = [];
        const items = [...this.getItems(), ...this.getBasket()];
        data?.forEach((e, i: number) => {
          const ii = items.findIndex((n) => n?.item?.indexOf(e) > -1) ?? -1;
          /**
           * The below validation might be required in the future case, please don't remove.
           * if(ii === -1) return;
           * */
          const c = (res?.percentageExpected as number[])[i];
          basket?.push({ item: e, value: parseInt(`${c}`) || 0, color: `${items[ii]?.color ?? items[i]?.color}` });
        });
        this.basket = basket;
        this._previousStatus = true;
      });
  }

  publish(): void {

    // if (!this.selection.every((n) => parseFloat(n?.rate as any) > 0)) return this._appService.toastr('Rate has to be greater than 0$');

    const requirement: string[] = [], percentage: number[] = [];
    ['Initial Screening'].forEach((e) => (requirement.push(e), percentage.push(0)));
    this._basket.forEach((e) => (requirement.push(e?.item), percentage.push(e?.value)));
    ['Final Discussion', 'Offer Release'].forEach((e) => (requirement.push(e), percentage.push(0)));

    // const rates: RateApprovalDto[] = [];
    // this.selection?.forEach(e => rates.push({ skillOwnerId: e.skillOwnerId, jobId: e.jobId }));

    const j: InsertRequirementPhaseDto = { jobId: this.jobId, requirementPhases: requirement }; /* percentageRequired: percentage */
    this.dialogConfig = '';

    this._service.insertRequirementPhases(j)
      .subscribe(async (res) => {
        // await this._service.skillOwnerRate(rates).toPromise();
        this.router.navigate(['/process/progress'], { queryParams: { jobId: this.jobId } });
      }, (err) => this._appService.toastr(err));
  }

  openDialog() {
    this.dialogConfig = 'percentage';
  }

  close() {
    this.dialogConfig = '';
  }

  onEnter(): void {
    this.add?.trim()?.length > 0 ? this.items.push({ item: this.add, value: 0, color: `${this.color()}` }) : null;
    this._edit = true;
    this.add = '';
  }

  edit(): void {
    this._edit = false;
  }

  rateEntry(event: Event, n: SelectionPhaseResponse): void {
    n['rate'] = parseFloat((event.target as HTMLInputElement)?.value) || 0;
  }

  onlyPrice(e: KeyboardEvent): void {
    this._appService.onlyNumber(e, 'price');
  }

  getOccurrence = (array: any[], value: any): number => array.filter((v) => v?.item === value).length;

  noReturnPredicate = (): boolean => false;

  allowedPredicate = (item: CdkDrag): boolean => true;

  color = (): string => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  reset(): void {
    this._previousStatus = false;
    this.basket = this.getBasket();
    this.items = this.getItems();
  }

  getItems(): IProcess[] {
    return [
      { item: 'Written Test', value: 0, color: '#93cc65' },
      { item: 'Coding Round', value: 0, color: '#cc7a65' },
      { item: 'Technical Interview', value: 0, color: '#00FFFF' },
      { item: 'HR Interview', value: 0, color: '#bf84ee' },
      { item: 'Hiring Manager Review', value: 0, color: '#df5bab' },
      { item: 'Behavioral Assesment', value: 0, color: '#5cc0a2' },
      { item: 'Bar Raiser', value: 0, color: '#4885ed' },
    ];
  }

  getBasket(): IProcess[] {
    return [
      { item: 'Start', value: 0, color: '#3cba54' },
      { item: 'Initial Screening', value: 0, color: '#edb33f' },
    ];
  }

  get _publish(): boolean {
    return this.selection.every((n) => n['rate'] !== null);
  }

  get _basket(): IProcess[] {
    return this.basket.filter((e) => !['Start', 'Initial Screening', 'Final Discussion', 'Offer Release'].includes(e?.item)) ?? [];
  }
}

interface ISelectionPhaseResponse extends SelectionPhaseResponse {
  avatar?: string;
}

interface IProcess {
  item: string;
  value: number;
  color: string;
}
