export interface ITableSettings {
  columns: Array<ITableColumns>;
  displayed: Array<string>;
  pageIndex: number;
  pageSize: number;
  pageSizeOptions: Array<number>;
}

export interface ITableColumns {
  columnDef: string;
  header: string;
  actions?: boolean;
  images?: boolean;
  logo?: boolean;
  logo1?: boolean;
  details?: boolean;
  style?: boolean;
  class?: (n: any) => string;
  cell?: (n: any) => string;
  cell1?: (n: any) => string;
  cell2?: (n: any) => string;
  cell3?: (n: any) => string;
}
