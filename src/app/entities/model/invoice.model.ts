import {InvoiceItem} from "./invoice-item.model";
import {CurrencyEnum} from "../enum/currency.enum";

export class Invoice {
  constructor(
    public customer?: string,
    public invoiceNumber?: string,
    public date?: string,
    public paymentDate?: string,
    public address?: string,
    public currency?: CurrencyEnum,
    public destination?: string,
    public installment?: string,
    public paymentMethod?: string,
    public paymentObs?: string,
    public items?: InvoiceItem[]
  ) {
  }
}


