import {Component, ElementRef, ViewChild} from '@angular/core';
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas"
import {FormBuilder, NgForm} from '@angular/forms';
import {InvoiceFileService} from "./invoice-file.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Invoice} from "../../model/invoice.model";
import {InvoiceItem} from "../../model/invoice-item.model";
import {ItemTypeEnum} from "../../enum/item-type.enum";
import {TranslateService} from "@ngx-translate/core";
import {CurrencyEnum} from "../../enum/currency.enum";

@Component({
  selector: 'app-invoice-file',
  templateUrl: './invoice-file.component.html',
  styleUrls: ['./invoice-file.component.scss']
})
export class InvoiceFileComponent {

  @ViewChild('content', {static: false}) el!: ElementRef
  @ViewChild('asd', {static: false}) el2!: ElementRef

  invoice!: Invoice;
  outerEntity!: Invoice;
  items!: InvoiceItem[];
  discounts!: InvoiceItem[];

  @ViewChild('invoiceForm')
  form?: NgForm;

  isLoading = false;
  fullPrice: number = 0;

  constructor(
    private fb: FormBuilder,
    private invoiceFileService: InvoiceFileService,
    private translateService: TranslateService,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {

    this.outerEntity = {
      ...new Invoice(),
      ...this.invoice
    } as Invoice

    this.items = this.outerEntity.items?.filter(item => item.type === ItemTypeEnum.ITEM) || []
    this.discounts = this.outerEntity.items?.filter(item => item.type === ItemTypeEnum.DISCOUNT) || []

    const sum = this.items?.reduce((accumulator, object) => {
      return accumulator + ((object?.price || 0) * (object.amount || 0));
    }, 0);

    const discount = this.discounts?.reduce((accumulator, object) => {
      return accumulator + ((object?.price || 0) * (object.amount || 0));
    }, 0);

    if (this.invoice.currency === CurrencyEnum.BRL) {
      this.translateService.use('pt')
    } else {
      this.translateService.use('en')

    }


    this.fullPrice = sum - discount || 0
  }

  teste2() {
    html2canvas(this.el.nativeElement).then(function (canvas) {
      canvas.id = "asd"
      document.body.appendChild(canvas);
    });
  }

  generatePdf() {
    this.isLoading = true;
    html2canvas(this.el.nativeElement, {scale: 1.2}).then((canvas) => {
        const imgData = canvas.toDataURL(
          'image/png');
        const doc = new jsPDF('p', 'px', [1200, 1700]);
        doc.addImage(imgData, 'PNG', 0, 0, 1200, 1700);
        doc.save('recibo.pdf');
        this.isLoading = false;

      }
    );
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

  close() {
    this.activeModal.close()
  }
}
