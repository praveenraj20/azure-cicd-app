import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PartnerAdmin } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { PartnersAdminService } from '../../partners-admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
  partner: MatTableDataSource<PartnerAdmin> = new MatTableDataSource<PartnerAdmin>([]);
  partner$!: Observable<PartnerAdmin[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageOptions = { length: 0, size: 10, sizeOptions: [5, 10, 25, 100] };

  constructor(
    private readonly router: Router,
    private readonly _service: PartnersAdminService,
    private readonly _appService: AppService) { }

  ngOnInit(): void {
    this.partner$ = this.partner?.connect();
    this.getPartners();
  }

  ngAfterViewInit(): void {
    this.partner.paginator = this.paginator;
  }

  getPartners(): void {
    this._service.getAllSkillPartner()
      .subscribe((j) => {
        this.partner.data = j;
        this.pageOptions.length = j.length ?? 0;
      }, (err) => this._appService.toastr(err));
  }

  add(): void {
    this.router.navigate(['/partners-admin/add'], { queryParams: { type: 'new' } });
  }

  navigate(n: PartnerAdmin, type: 'edit' | 'preview'): void {
    this.router.navigate(['/partners-admin/add'], { queryParams: { id: n?.id, type: type ?? 'preview' } });
  }

  pageChange(e: PageEvent): void {

  }
}
