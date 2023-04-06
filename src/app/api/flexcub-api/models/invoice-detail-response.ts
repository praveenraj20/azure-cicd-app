/* tslint:disable */
/* eslint-disable */
import { InvoiceStatus } from './invoice-status';
import { WorkEfforts } from './work-efforts';
export interface InvoiceDetailResponse {
  comments?: string;
  dueDate?: string;
  endDate?: string;
  invoiceData?: Array<WorkEfforts>;
  invoiceDate?: string;
  skillPartnerId?: number;
  startDate?: string;
  status?: InvoiceStatus;
}
