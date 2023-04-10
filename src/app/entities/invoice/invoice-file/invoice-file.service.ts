import {Injectable} from '@angular/core';
import {InvoiceFileComponent} from "./invoice-file.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Invoice} from "../../model/invoice.model";

@Injectable({
  providedIn: 'root'
})
export class InvoiceFileService {

  private isOpen = false;
  private instance?: NgbModalRef;

  constructor(private modalService: NgbModal
  ) {
  }

  open(invoice: Invoice) {
    const modalRef = this.modalService.open(InvoiceFileComponent)
    modalRef.componentInstance.invoice = invoice
  }

  close(): void {
    if (!this.isOpen || !this.instance) return;
    this.instance.dismiss();
  }
}
