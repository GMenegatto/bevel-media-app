import {Injectable} from '@angular/core';
import {InvoiceItemComponent} from "./invoice-item.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Invoice} from "../../model/invoice.model";
import {InvoiceItem} from "../../model/invoice-item.model";
import {ItemTypeEnum} from "../../enum/item-type.enum";

@Injectable({
  providedIn: 'root'
})
export class InvoiceItemService {

  private isOpen = false;
  private instance?: NgbModalRef;

  constructor(private modalService: NgbModal
  ) {
  }

  open(item?: InvoiceItem, itemType?: ItemTypeEnum, confirm?: Function) {
    this.instance = this.modalService.open(InvoiceItemComponent)
    this.instance.componentInstance.item = item
    this.instance.componentInstance.itemType = itemType
    this.instance.componentInstance.confirm = confirm
  }

  confirm(): void {
    if (!this.isOpen || !this.instance) return;
    this.instance.close();
  }

  close(): void {
    if (!this.isOpen || !this.instance) return;
    this.instance.dismiss();
  }
}
