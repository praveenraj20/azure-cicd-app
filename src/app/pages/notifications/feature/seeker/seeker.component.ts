import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, Observable } from 'rxjs';
import { SeekerNotificationsEntity } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { NotificationsService } from '../../notifications.service';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss'],
})
export class SeekerComponent implements OnInit, AfterViewInit {
  notifications: MatTableDataSource<SeekerNotificationsEntity> = new MatTableDataSource<SeekerNotificationsEntity>([]);
  notifications$!: Observable<SeekerNotificationsEntity[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageOptions = { length: 0, size: 10, sizeOptions: [5, 10, 25, 100] };
  seekerId!: number;

  constructor(
    private readonly router: Router,
    private readonly _service: NotificationsService,
    private readonly _appService: AppService,
    private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.notifications$ = this.notifications?.connect();
    this.route.queryParams
      .pipe(filter(e => !!e && !!e?.id), first())
      .subscribe(e => {
        const k = parseInt(e?.id) || 0;
        k ? this.seekerId = k : null;

      });
    this.getNotifications();
  }

  ngAfterViewInit(): void {
    this.notifications.paginator = this.paginator;
  }

  getNotifications(): void {
    const id = this._appService.user?.id;
    if (!id) return;

    this._service.getSeekerNotification(id)
      .subscribe(
        (j) => {
          this.notifications.data = j;
          this.pageOptions.length = j.length ?? 0;
        }, (err) => {
          // this._appService.toastr(err);
        });
  }

  pageChange(e: PageEvent): void { }

  back(): void {
    this.router.navigateByUrl('/dashboard');
  }

  onMarkRead(n: SeekerNotificationsEntity) {
    this._service.seekerMarkAsRead(n?.id as number).subscribe((res) => {
      this.getNotifications();
    });
  }
}
