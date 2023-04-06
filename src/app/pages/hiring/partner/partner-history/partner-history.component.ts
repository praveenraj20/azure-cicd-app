import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, Observable } from 'rxjs';
import { HistoryOfJobs, JobHistory, SkillOwnerDto } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { DEFAULT_AVATAR } from 'src/app/core/constants/constant';
import { HiringService } from '../../hiring.service';

@Component({
  selector: 'app-partner-history',
  templateUrl: './partner-history.component.html',
  styleUrls: ['./partner-history.component.scss']
})
export class PartnerHistoryComponent implements OnInit, AfterViewInit {
  id!: number;
  _search: string = '';
  jobHistory: HistoryOfJobs[] = []
  nullish: any[] = [null, undefined, ''];
  skillOwner!: SkillOwnerDto;
  jobsHistory: MatTableDataSource<JobHistory> = new MatTableDataSource<JobHistory>([]);
  jobsHistory$!: Observable<any>; //Intentionally kept it to <any> because of the search pipe used in DOM.
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  avatar: string = DEFAULT_AVATAR;
  pageOptions = { length: 0, size: 10, sizeOptions: [5, 10, 25, 100] };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly _service: HiringService,
    private readonly _appService: AppService) { }

  ngOnInit(): void {
    this.jobsHistory$ = this.jobsHistory?.connect();
    this.route.queryParams
      .pipe(
        filter(e => !!e && !!e.empId),
        first()
      ).subscribe(e => {
        this.id = parseInt(e?.empId) || 0;
        this.getSkillOwner(this.id);
        this.getJobHistory(this.id);
        this.historyOfJobs(this.id);
      });
  }

  ngAfterViewInit(): void {
    this.jobsHistory.paginator = this.paginator;
  }

  getSkillOwner(id: number): void {
    this._service.getSkillOwner(id)
      .subscribe(async (j) => {
        this.skillOwner = j;
        this._appService.defaultAvatar(id).then((ii) => this.avatar = ii);
      }, (err) => {
        // this._appService.toastr(err);
      });
  }

  getJobHistory(id: number): void {
    this._service.getJobHistoryInSeeker(id)
      .subscribe((j) => {
        this.jobsHistory.data = j;
        this.pageOptions.length = j.length ?? 0;
      }, (err) => this._appService.toastr(err));
  }

  viewNotification(n: JobHistory): void {
    this.router.navigate(['/notifications/jobs'], { queryParams: { empId: this.id, jobId: n?.jobId } })
  }

  navigate(url: string, j?: Object): void {
    this.router.navigate([url], { queryParams: { ...(j) && { ...j } } });
  }

  historyOfJobs(id: number) {
    this._service.historyOfJobs(id).subscribe((j) => {
      this.jobHistory = j
    })
  }

}
