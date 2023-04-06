import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as moment from 'moment';
import { filter } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Registration } from './api/flexcub-api/models';
import { DEFAULT_AVATAR, DEFAULT_PIC } from './core/constants/constant';
import { ITableColumns, ITableSettings } from './core/models';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  user!: Registration;
  previousUrl: string = '/dashboard';
  currentUrl: string = '/dashboard';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router) {
    this.user = JSON.parse(localStorage.getItem('user') as string) as Registration ?? null;
    this.routerEvents();
  }

  routerEvents(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = (e as NavigationEnd)?.url;
      });
  }

  defaultTableSettings(options: { columns: Array<ITableColumns>, pageIndex?: number, pageSize?: number, pageSizeOptions?: Array<number> }): ITableSettings {
    const settings: ITableSettings = {
      columns: options.columns,
      displayed: options.columns?.map((c: ITableColumns) => c?.columnDef) ?? [],
      pageIndex: options.pageIndex ? options.pageIndex : 0,
      pageSize: options.pageSize ? options.pageSize : 10,
      pageSizeOptions: options.pageSizeOptions ? options.pageSizeOptions : [10, 25, 50, 100]
    }
    return settings;
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('universalSlot');
    window.location?.reload();
  }

  toastr(e?: string, j?: { text?: string, time?: number, icon?: 'error' | 'warning' | 'success' }): void {
    Swal.fire({
      position: 'center',
      icon: j?.icon ?? 'error',
      title: e ?? 'Something went wrong, try again.',
      showConfirmButton: false,
      timer: j?.time ?? 1500,
      ...(j?.text) && { text: j?.text ?? '' }
    });
  }

  confirmation(title: string, text: string, j?: { showCancelButton?: boolean, confirmButtonText?: string, icon?: 'error' | 'warning' | 'success' }): Promise<boolean> {
    return new Promise(async (resolve) => {
      const n = await Swal.fire({
        title: title ?? 'Are you sure?',
        text: text ?? '',
        position: 'center',
        icon: j?.icon ?? 'warning',
        showCancelButton: j?.showCancelButton ?? false,
        showConfirmButton: true,
        confirmButtonColor: '#4885ed',
        cancelButtonColor: '#f44336',
        confirmButtonText: j?.confirmButtonText ?? 'Yes',
      });
      n?.isConfirmed ? resolve(true) : resolve(false);
    });
  }

  convertTime(j: Date | string): string {
    const m = new Date(j);
    const n = moment(m).format('YYYY-MM-DD');
    const k = new Date().toISOString()?.split('T')[1];
    return `${n}T${k}`;
  }

  timeout(time?: number): Promise<void> {
    return new Promise((j) => setTimeout(j, time ?? 1000));
  }

  onlyNumber(e: KeyboardEvent, type?: 'number' | 'price'): void {
    const regex = type === 'price' ? /[0-9\\.\\]/ : /[0-9\\]/;
    const character = String.fromCharCode(e?.charCode);
    e?.keyCode !== 8 && !regex.test(character) ? e?.preventDefault() : null;
  }

  profilePic(id: number): Promise<string> {
    return new Promise((res) => {
      fetch(`${environment.apiPrefix}/resource-planning/api/v1/fileDownloadImage?id=${id}`)
        .then((e) => res(e?.status === 200 ? `${environment.apiPrefix}/resource-planning/api/v1/fileDownloadImage?id=${id}` : DEFAULT_PIC))
        .catch(() => res(DEFAULT_PIC));
    });
  }

  defaultAvatar(id: number): Promise<string> {
    return new Promise((res) => {
      fetch(`${environment.apiPrefix}/resource-planning/api/v1/fileDownloadImage?id=${id}`)
        .then((e) => res(e?.status === 200 ? `${environment.apiPrefix}/resource-planning/api/v1/fileDownloadImage?id=${id}` : DEFAULT_AVATAR))
        .catch(() => res(DEFAULT_AVATAR));
    });
  }

  /** For more information please refer search.pipe.ts. It's just a clone from searchFilter, But here we will be returning the boolean value.  */
  _searchFilter(group: any, value: string, items?: string[]): boolean {
    if (!value) return true;
    return items?.some((key) => group[key]?.toLowerCase()?.indexOf(value?.toLowerCase()) !== -1) ?? true;
  }

}
