import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SeekerAdmin } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { SeekersService } from '../../seekers.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit, AfterViewInit {
  seekers: MatTableDataSource<SeekerAdmin> = new MatTableDataSource<SeekerAdmin>([]);
  seekers$!: Observable<SeekerAdmin[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageOptions = { length: 0, size: 10, sizeOptions: [5, 10, 25, 100] };

  constructor(
    private readonly router: Router,
    private readonly _service: SeekersService,
    private readonly _appService: AppService) { }

  ngOnInit(): void {
    this.seekers$ = this.seekers?.connect();
    this.getSeekers();
  }

  ngAfterViewInit(): void {
    this.seekers.paginator = this.paginator;
  }

  getSeekers(): void {
    this._service.skillSeekerByAdmin()
      .subscribe((j) => {
        this.seekers.data = j;
        this.pageOptions.length = j.length ?? 0;
      }, (err) => this._appService.toastr(err));
  }

  add(): void {
    this.router.navigate(['/seekers/add'], { queryParams: { type: 'new' } });
  }

  navigate(n: SeekerAdmin, type: 'edit' | 'preview'): void {
    this.router.navigate(['/seekers/add'], { queryParams: { id: n?.id, type: type ?? 'preview' } });
  }

  pageChange(e: PageEvent): void {

  }
}
