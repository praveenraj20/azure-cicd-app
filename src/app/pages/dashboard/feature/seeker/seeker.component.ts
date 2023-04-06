import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Registration, RequirementPhaseDetailsDto, SeekerNotificationsEntity } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { IDMenu, IDNotification } from 'src/app/core/models';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss']
})
export class SeekerComponent implements OnInit {
  user: Registration;
  menus: IDMenu[] = [
    {
      title: 'Jobs', crawler: 'Manage Jobs', route: '/jobs',
      icon: 'fa-briefcase', style: 'v-1'
    },
    {
      title: 'Contracts', crawler: 'Manage Contracts', route: '/contracts',
      icon: 'fa-file-contract', style: 'v-2'
    },
    {
      title: 'Hiring', crawler: 'Manage Hiring', route: '/hiring',
      icon: 'fa-person-sign', style: 'v-5'
    },
    {
      title: 'Invoice', crawler: 'Manage Invoices', route: '/invoice',
      icon: 'fa-file-invoice-dollar', style: 'v-3'
    },
    {
      title: 'Projects', crawler: 'Manage Projects', route: '/projects',
      icon: 'fa-file-code', style: 'v-4'
    }
  ];
  notifications: IDNotification[] = [];

  constructor(
    private readonly _appService: AppService,
    private readonly _service: DashboardService,
    private readonly router: Router) {
    this.user = this._appService.user;
  }

  ngOnInit(): void {
    this.getNotifications();
  }

  notificationRead(n: SeekerNotificationsEntity): void {
    this._service.seekerMarkAsRead(n?.id as number)
      .subscribe(() => {
        this.getNotifications();
      }, (err) => this._appService.toastr(err));
  }

  getNotifications(): void {
    const id = this.user?.id;
    if (!id) return;
    this._service.getSeekerLastFiveNotification(id)
      .subscribe((j) => {
        const kk = {} as { [key: string]: SeekerNotificationsEntity[] };
        j?.forEach((m, i) => {
          const date = moment(m?.date).format('YYYY-MM-DD');
          !kk[date] ? kk[date] = [] : null;
          kk[date]?.push(m);
        });

        this.notifications = Object.keys(kk).map((date) => {
          return { date, items: kk[date] };
        });
      });
  }

  onAccept(n: SeekerNotificationsEntity): void {

    this._service.updateSlotConfirmedBySeeker(n?.jobId as string, n?.ownerId as number).subscribe((res) => {
      this._service.acceptInterview(n?.jobId as string, n?.ownerId as number).subscribe((res) => {
        let req: RequirementPhaseDetailsDto = {
          jobId: n?.jobId,
          skillOwnerId: n?.ownerId,
          stage: n?.stage,
          interviewedBy: `${this.user.firstName} ${this.user.lastName}`,
          modeOfInterview: 'Remote',
          feedback: 'Cleared',
        };
        this._service.updateDetailsForParticularRound(req).subscribe(
          (res) => {
            this.notificationRead(n as SeekerNotificationsEntity);
            this._appService.toastr('Accepted successfully', { icon: 'success' });
          }, (err) => this._appService.toastr(err)
        );
      });
    });
  }

  onMarkAllRead() {
    const id = this.user?.id;
    if (!id) return;
    this._service.getPartnerLastFiveNotification(id)
      .subscribe((j) => {
        j?.forEach(e => this.notificationRead(e as SeekerNotificationsEntity))
      });
  }

  navigate(n: IDMenu): void {
    n?.route ? this.router.navigateByUrl(n?.route) : null;
  }
}
