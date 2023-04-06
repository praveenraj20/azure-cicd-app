/* tslint:disable */
/* eslint-disable */
import { InvoiceStatus } from './invoice-status';
export interface InvoiceListingData {
  comments?: string;
  invoiceDate?: string;
  invoiceId?: string;
  paymentDueDate?: string;
  soCount?: number;
  status?: InvoiceStatus;
  to?: string;
  weekStartDate?: string;
}
