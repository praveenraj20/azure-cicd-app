import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, Observable } from 'rxjs';
import { OwnerNotificationsEntity } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { NotificationsService } from '../../notifications.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit, AfterViewInit {
  notifications: MatTableDataSource<OwnerNotificationsEntity> = new MatTableDataSource<OwnerNotificationsEntity>([]);
  notifications$!: Observable<OwnerNotificationsEntity[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageOptions = { length: 0, size: 10, sizeOptions: [5, 10, 25, 100] };
  jobId!: string;

  constructor(
    private readonly router: Router,
    private readonly _service: NotificationsService,
    private readonly _appService: AppService,
    private readonly route: ActivatedRoute) { }

  ngOnInit(): void {

    this.notifications$ = this.notifications?.connect();
    this.getNotifications();
  }

  ngAfterViewInit(): void {
    this.notifications.paginator = this.paginator;
  }

  getJobNotification(): void {
    const id = this._appService.user?.id;
    if (!id || !this.jobId) return;

    this._service.getJobSpecificNotificationForOwner(id, this.jobId)
      .subscribe((j) => {
        this.notifications.data = j;
        this.pageOptions.length = j.length ?? 0;
      }, (err) => this._appService.toastr(err));
  }

  getNotifications(): void {
    const id = this._appService.user?.id;
    if (!id) return;

    this._service.getOwnerNotification(id)
      .subscribe((j) => {
        this.notifications.data = j;
        this.pageOptions.length = j.length ?? 0;
      }, (err) => this._appService.toastr(err))
  }

  pageChange(e: PageEvent): void { }

  back(): void {
    this.router.navigateByUrl('/dashboard');
  }

  onMarkRead(n:OwnerNotificationsEntity) {
    this._service.ownerMarkAsRead(n?.id as number).subscribe((res) => {
      this.getNotifications();
    });
  }
}
