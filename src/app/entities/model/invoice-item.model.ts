import {ItemTypeEnum} from "../enum/item-type.enum";

export class InvoiceItem {
  constructor(
    public  id?: string,
    public  description?: string,
    public  price?: number,
    public  type?: ItemTypeEnum,
    public  amount?: number,
) {
  }
}


