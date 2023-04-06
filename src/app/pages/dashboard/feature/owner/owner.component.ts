import { Component, OnInit } from '@angular/core';
import { OwnerNotificationsEntity, Registration } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { IDMenu, IDNotification } from 'src/app/core/models';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment';
import { filter, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addDays, isAfter, isBefore, set } from 'date-fns';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss'],
})
export class OwnerComponent implements OnInit {
  user: Registration;
  menus: IDMenu[] = [
    {
      title: 'Timesheets',
      crawler: 'Manage Timesheets',
      route: '/timesheet',
      icon: 'fa-clock',
      style: 'v-1',
    },
    {
      title: 'Hot Jobs',
      crawler: 'See New Jobs',
      route: '/jobs',
      icon: 'fa-fire',
      style: 'v-2',
    },
    {
      title: 'Learn & Grow',
      crawler: 'Go to Course',
      route: '/learn',
      icon: 'fa-chart-line',
      style: 'v-5',
    },
    {
      title: 'Career Profile',
      crawler: 'Manage Profile',
      route: '/profile',
      icon: 'fa-person-carry',
      style: 'v-4',
    },
  ];
  notifications: IDNotification[] = [];
  _slotSelection: boolean = false;
  _slotSelectionStatus: 'universalSlot' | string = '';
  entityInfo!: OwnerNotificationsEntity;
  bsConfig: Partial<BsDatepickerConfig> = {
    isAnimated: true,
    dateInputFormat: 'MM/DD/YYYY',
    containerClass: 'theme-dark-blue',
  };
  slots: ISlots[] = [];

  constructor(
    private readonly _appService: AppService,
    private readonly _service: DashboardService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly datePipe: DatePipe
  ) {
    this.user = this._appService.user;
  }

  ngOnInit(): void {
    const k = localStorage.getItem('universalSlot');
    this.user?.loginCount === 1 && !k
      ? ((this._slotSelection = true),
        (this._slotSelectionStatus = 'universalSlot'))
      : null;
    this.getNotifications();
    this.initSlots();
  }

  slotSelection(n: OwnerNotificationsEntity, m: string): void {
    this._slotSelection = true;
    this._slotSelectionStatus = m;
    this.entityInfo = n;
  }

  initSlots(count?: number): void {
    const defaults = () =>
      this.fb.group({
        date: [null, [Validators.required]],
        start: [null, [Validators.required]],
        end: [null, [Validators.required]],
      });

    Array(count ? count : 3)
      .fill('')
      .forEach((e: string, i: number) => {
        /** Do not use extra brain and get this out of the forEach scope.  */
        const j = defaults();
        this.slots.push({ form: j, min: new Date() });

        const m = (key: string) => j?.get(key)?.value ?? null;
        const error = (key: string, err: any) => j.get(key)?.setErrors(err);

        const splitFn = (value: Date) => {
          const i = moment(value).format('HH:mm:ss');
          const ii = i?.split(':')?.map(e => parseInt(e) || 0);
          return { hours: ii[0] ?? 0, minutes: ii[1] ?? 0, seconds: ii[2] ?? 0 };
        };

        /** To check the validation between the start and end dates.  */
        j?.valueChanges?.subscribe(() => {
          const date = m('date'), start = m('start'), end = m('end');
          if (date !== null && date instanceof Date) {
            const _start = start ? set(date, { ...splitFn(start) }) : null;
            const _end = end ? set(date, { ...splitFn(end) }) : null;
            error('end', _start instanceof Date && _end instanceof Date ? isAfter(_end, _start) ? null : { isBefore: true } : null)
          }
        });

        /** To adjust the mininum date of the next index.  */
        j?.valueChanges
          ?.pipe(filter(() => j?.valid))
          ?.subscribe(() => {
            const a = this.slots[i + 1];
            a?.form?.get('date')?.setValue(null);
            const min = m('date');
            min instanceof Date && a ? (a.min = addDays(min, 1)) : null;
          });
      });
  }

  closeSelection(): void {
    this._slotSelection = false;
    this._slotSelectionStatus = '';
    this.entityInfo = null as any;
  }

  saveSlots(): void {
    this._slotSelectionStatus === 'universalSlot'
      ? this.saveUnivesalSlot()
      : this.saveCommonSlot();
  }

  saveUnivesalSlot(): void {
    const j = { skillOwnerEntityId: this.user?.id };
    this.slots.forEach((e, i: number) => {
      let ii = i + 1;
      const form = e?.form;
      Object.assign(j, {
        [`dateSlotsByOwner${ii}`]: this._appService.convertTime(
          form?.get('date')?.value
        ),
        [`timeSlotsByOwner${ii}`]: this.datePipe.transform(
          form?.get('start')?.value,
          'HH:mm'
        ),
        [`endTimeSlotsByOwner${ii}`]: this.datePipe.transform(
          form?.get('end')?.value,
          'HH:mm'
        ),
      });
    });

    this._service.insertUniversalSlot(j).subscribe(
      async () => {
        this._appService.toastr('Universal slot added successfully', {
          icon: 'success',
        });
        this.user?.loginCount === 1
          ? localStorage.setItem('universalSlot', 'true')
          : localStorage.removeItem('universalSlot');
        if (this.entityInfo) {
          await this.notificationRead(this.entityInfo);
        }
        this.closeSelection();
        this.slots = [];
        this.initSlots();
      },
      (err) => this._appService.toastr(err)
    );
  }

  saveCommonSlot(): void {
    const j = {
      skillOwnerEntityId: this.entityInfo?.skillOwnerEntityId,
      jobId: this.entityInfo?.jobId,
    };
    this.slots.forEach((e, i: number) => {
      let ii = i + 1;
      const form = e?.form;
      Object.assign(j, {
        [`dateSlotsByOwner${ii}`]: this._appService.convertTime(
          form?.get('date')?.value
        ),
        [`timeSlotsByOwner${ii}`]: this.datePipe.transform(
          form?.get('start')?.value,
          'HH:mm'
        ),
        [`endTimeSlotsByOwner${ii}`]: this.datePipe.transform(
          form?.get('end')?.value,
          'HH:mm'
        ),
      });
    });

    this._service.updateSlotBySkillOwner(j).subscribe(
      async () => {
        await this.notificationRead(this.entityInfo);
        this.closeSelection();
        this.slots = [];
        this.initSlots();
      },
      (err) => this._appService.toastr(err)
    );
  }

  notificationRead(n: OwnerNotificationsEntity): Promise<void> {
    return new Promise((rs) => {
      this._service.ownerMarkAsRead(n?.id as number).subscribe(
        () => {
          this.getNotifications();
          rs();
        },
        (err) => (this._appService.toastr(err), rs())
      );
    });
  }

  getNotifications(): void {
    const id = this.user?.id;
    if (!id) return;
    this._service.getLastFiveNotificationOfOwner(id).subscribe((j) => {
      const kk = {} as { [key: string]: OwnerNotificationsEntity[] };
      j?.forEach((m, i) => {
        const date = moment(m?.date).format('YYYY-MM-DD');
        !kk[date] ? (kk[date] = []) : null;
        kk[date]?.push(m);
      });

      this.notifications = Object.keys(kk).map((date) => {
        return { date, items: kk[date] };
      });
    });
  }

  scheduleInterview(n: OwnerNotificationsEntity): void {
    this._service
      .candidateInterviewDetails(
        n?.jobId as string,
        n?.skillOwnerEntityId as number
      )
      .subscribe(
        () => {
          forkJoin([
            this._service.acceptInterview(
              n?.jobId as string,
              n?.skillOwnerEntityId as number
            ),
            this._service.ownerMarkAsRead(n?.id as number),
          ]).subscribe(([ai, mr]) => {
            this.getNotifications();
          });
        },
        (err) => this._appService.toastr(err)
      );
  }

  acceptOrReject(n: OwnerNotificationsEntity, status: boolean): void {
    const j = {
      jobId: n?.jobId,
      skillOwnerEntityId: n?.skillOwnerEntityId,
      accepted: status,
    };

    this._service.acceptRejectBySkillOwner(j).subscribe(
      (res) => {
        this._appService.toastr(status ? 'Accepted' : 'Rejected successfully', {
          icon: 'success',
        });
        this.notificationRead(n);
      },
      (err) => this._appService.toastr(err)
    );
  }

  navigate(n: IDMenu): void {
    n?.route ? this.router.navigateByUrl(n?.route) : null;
  }

  evaluate = (i: number): boolean =>
    i > 0 ? this.slots[i - 1]?.form?.valid : true;

  slotsControl(n: ISlots) {
    return n?.form?.controls;
  }

  get _saveSlots(): boolean {
    return this.slots.every((e) => e?.form?.valid);
  }
}

interface ISlots {
  form: FormGroup;
  min: Date;
}
