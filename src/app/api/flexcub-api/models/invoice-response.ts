/* tslint:disable */
/* eslint-disable */
import { InvoiceStatus } from './invoice-status';
export interface InvoiceResponse {
  invoiceId?: string;
  invoiceStatus?: InvoiceStatus;
  totalAmount?: number;
}
