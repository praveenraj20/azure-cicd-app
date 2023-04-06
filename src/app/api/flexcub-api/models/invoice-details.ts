/* tslint:disable */
/* eslint-disable */
import { InvoiceStatus } from './invoice-status';
export interface InvoiceDetails {
  clientName?: string;
  comments?: string;
  date?: string;
  invoiceId?: string;
  partnerId?: number;
  partnerName?: string;
  paymentDueDate?: string;
  seekerProjectName?: string;
  status?: InvoiceStatus;
  weekStartDate?: string;
}
