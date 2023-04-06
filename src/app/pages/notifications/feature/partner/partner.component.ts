import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, filter, first } from 'rxjs';
import { PartnerNotificationsEntity } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { NotificationsService } from '../../notifications.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit, AfterViewInit {
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
    this.partnerNotification();
  }

  ngAfterViewInit(): void {
    this.notifications.paginator = this.paginator;
  }

  partnerNotification(){
    const id = this._appService.user?.id;
    if(!id) return;
    this._service.partnerNotification(id).subscribe((res) => {
      this.notifications.data= res;
      this.pageOptions.length = res.length ?? 0;
    }, (err) => this._appService.toastr(err))
  }

  pageChange(e: PageEvent): void { }

  navigate(): void {
    const url = this._appService.previousUrl?.indexOf(this.router.url) > -1 ? '/dashboard' : this._appService.previousUrl ?? '/dashboard';
    this.router.navigateByUrl(url);
  }
  onMarkRead(n:PartnerNotificationsEntity) {
    this._service.partnerMarkAsRead(n?.id as number).subscribe((res) => {
      this.partnerNotification();
    });
  }
}
