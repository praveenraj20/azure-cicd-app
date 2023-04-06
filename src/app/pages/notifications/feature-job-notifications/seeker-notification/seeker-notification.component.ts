import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, filter, first } from 'rxjs';
import { PartnerNotificationsEntity } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { NotificationsService } from 'src/app/pages/notifications/notifications.service';

@Component({
  selector: 'app-seeker-notification',
  templateUrl: './seeker-notification.component.html',
  styleUrls: ['./seeker-notification.component.scss']
})
export class SeekerNotificationComponent implements OnInit {
  id!: number;
  jobId!: string;
  notifications: MatTableDataSource<PartnerNotificationsEntity> = new MatTableDataSource<PartnerNotificationsEntity>([]);
  notifications$!: Observable<PartnerNotificationsEntity[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageOptions = { length: 0, size: 10, sizeOptions: [5, 10, 25, 100] };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly _service: NotificationsService,
    private readonly _appService: AppService) { }

  ngOnInit(): void {
    this.notifications$ = this.notifications?.connect();

    this.route.queryParams
      .pipe(
        filter(e => !!e && !!e.empId && !!e.jobId),
        first()
      ).subscribe(e => {
        this.id = parseInt(e?.empId) || 0;
        this.jobId = e?.jobId;
        this.getNotifications(this.id, this.jobId);
      });
  }

  ngAfterViewInit(): void {
    this.notifications.paginator = this.paginator;
  }

  getNotifications(id: number, jobId: string): void {
    this._service.getSeekerNotificationByOwner(id, jobId)
      .subscribe((j) => {
        this.notifications.data = j;
        this.pageOptions.length = j.length ?? 0;
      }, (err) => this._appService.toastr(err))
  }

  pageChange(e: PageEvent): void { }

  navigate(): void {
    const url = this._appService.previousUrl?.indexOf(this.router.url) > -1 ? '/dashboard' : this._appService.previousUrl ?? '/dashboard';
    this.router.navigateByUrl(url);
  }
}
