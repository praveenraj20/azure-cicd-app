/* tslint:disable */
/* eslint-disable */
import { PartnerInvoiceResponse } from './partner-invoice-response';
export interface InvoiceRequest {
  dueDate?: string;
  endDate?: string;
  partnerInvoiceResponseList?: Array<PartnerInvoiceResponse>;
  skillPartnerId?: number;
  startDate?: string;
}
