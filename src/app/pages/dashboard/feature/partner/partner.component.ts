import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { OwnerNotificationsEntity, PartnerNotificationsEntity, Registration } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { IDMenu, IDNotification } from 'src/app/core/models';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit {
  user: Registration;
  menus: IDMenu[] = [
    {
      title: 'Talents', crawler: 'Manage Talents', route: '/talents/add',
      icon: 'fa-person-carry', style: 'v-1'
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
      icon: 'fa-file-invoice-dollar', style: 'v-4'
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

  notificationRead(n: PartnerNotificationsEntity): void {
    this._service.partnerMarkAsRead(n?.id as number)
      .subscribe(() => {
        this.getNotifications();
      }, (err) => this._appService.toastr(err));
  }

  getNotifications(): void {
    const id = this.user?.id;
    if (!id) return;
    this._service.getPartnerLastFiveNotification(id)
      .subscribe((j) => {
        const kk = {} as { [key: string]: PartnerNotificationsEntity[] };
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

  onMarkAllRead() {
    const id = this.user?.id;
    if (!id) return;
    this._service.getPartnerLastFiveNotification(id)
    .subscribe((j) => {
      j?.forEach(e => this.notificationRead(e as PartnerNotificationsEntity));
    });
  }

  navigate(n: IDMenu): void {
    n?.route ? this.router.navigateByUrl(n?.route) : null;
  }
}
