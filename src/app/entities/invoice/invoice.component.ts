import {Component, ElementRef, ViewChild} from '@angular/core';
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas"
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {InvoiceFileService} from "./invoice-file/invoice-file.service";
import {Invoice} from "../model/invoice.model";
import {InvoiceItem} from "../model/invoice-item.model";
import {InvoiceItemService} from "./invoice-item/invoice-item.service";
import {ItemTypeEnum} from "../enum/item-type.enum";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {

  @ViewChild('content', {static: false}) el!: ElementRef
  @ViewChild('asd', {static: false}) el2!: ElementRef

  editForm = this.fb.group({
    customer: ['', [Validators.required, Validators.maxLength(100)]],
    invoiceNumber: ['', [Validators.required, Validators.maxLength(100)]],
    date: [''],
    paymentDate: [''],
    currency: [''],
    address: [''],
    language: [''],
    destination: [''],
    paymentObs: [''],
    paymentMethod: [''],
    installment: ['']
  });

  invoice!: Invoice;
  items: InvoiceItem[] = [];

  @ViewChild('invoiceForm')
  form?: NgForm;

  constructor(
    private fb: FormBuilder,
    private invoiceFileService: InvoiceFileService,
    private invoiceItemService: InvoiceItemService,
  ) {
  }

  ngOnInit() {
    this.invoice = new Invoice()
    this.invoice.items = []

    this.editForm.get(['currency'])!.setValue('BRL')
  }

  teste2() {
    html2canvas(this.el.nativeElement).then(function (canvas) {
      canvas.id = "asd"
      document.body.appendChild(canvas);
    });
  }

  teste3() {
    html2canvas(this.el.nativeElement, {scale: 1.2}).then(function (canvas) {
      const imgData = canvas.toDataURL(
        'image/png');
      const doc = new jsPDF('p', 'px', [1200, 1700]);
      doc.addImage(imgData, 'PNG', 0, 0, 1200, 1700);
      doc.save('recibo.pdf');
    });
  }

  teste() {
    const doc = new jsPDF('p', 'px', [1200, 1700]);
    doc.html(this.el.nativeElement, {
      width: 1200,
      callback: (pdf) => {
        pdf.save("teste.pdf")
      }
    })
  }

  openInvoice() {
    this.invoice.customer = this.editForm.get(['customer'])!.value
    this.invoice.invoiceNumber = this.editForm.get(['invoiceNumber'])!.value
    this.invoice.date = this.editForm.get(['date'])!.value
    this.invoice.currency = this.editForm.get(['currency'])!.value
    this.invoice.paymentDate = this.editForm.get(['paymentDate'])!.value
    this.invoice.address = this.editForm.get(['address'])!.value
    this.invoice.paymentMethod = this.editForm.get(['paymentMethod'])!.value
    this.invoice.paymentObs = this.editForm.get(['paymentObs'])!.value
    this.invoice.destination = this.editForm.get(['destination'])!.value
    this.invoice.installment = this.editForm.get(['installment'])!.value
    this.invoiceFileService.open(this.invoice)
  }

  addItem() {
    this.invoiceItemService.open(undefined,  ItemTypeEnum.ITEM,(item: InvoiceItem) => {
      this.invoice.items?.push(item)
    })
  }

  addDiscount() {
    this.invoiceItemService.open(undefined, ItemTypeEnum.DISCOUNT, (item: InvoiceItem) => {
      this.invoice.items?.push(item)
    })
  }

  edit(item: InvoiceItem) {

    const oldItem = this.invoice.items!.find(cd => cd.description === item.description);

    this.invoiceItemService.open(item, item.type, (newItem: InvoiceItem) => {
      this.invoice.items![this.invoice.items!.indexOf(oldItem || new InvoiceItem())] = {
        ...newItem
      } as InvoiceItem
    })
  }

  delete(item: InvoiceItem) {

    const oldItem = this.invoice.items!.find(cd => cd.description === item.description) || new InvoiceItem();

    this.invoice.items = this.invoice.items!.filter(cd => cd.description !== oldItem.description);

  }
}
