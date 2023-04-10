import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {InvoiceItemService} from "./invoice-item.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Invoice} from "../../model/invoice.model";
import {InvoiceItem} from "../../model/invoice-item.model";
import {ItemTypeEnum} from "../../enum/item-type.enum";

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss']
})
export class InvoiceItemComponent {

  @ViewChild('content', {static: false}) el!: ElementRef
  @ViewChild('asd', {static: false}) el2!: ElementRef

  editForm = this.fb.group({
    id: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(100)]],
    amount: [''],
    price: [''],
  });

  item?: InvoiceItem;
  itemType?: ItemTypeEnum;
  confirm?: Function;


  @ViewChild('invoiceForm')
  form?: NgForm;

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public invoiceItemService: InvoiceItemService
  ) {
  }

  ngOnInit() {
    if (this.item) {
      this.editForm.get(['description'])?.setValue(this.item.description)
      this.editForm.get(['price'])?.setValue(this.item.price)
      this.editForm.get(['amount'])?.setValue(this.item.amount)
    }
  }

  close() {
    this.activeModal.close()
  }

  addItem() {
    this.item = new InvoiceItem()
    this.item.type = this.itemType
    this.item.id = this.editForm.get(['id'])!.value
    this.item.description = this.editForm.get(['description'])!.value
    this.item.amount = this.editForm.get(['amount'])!.value
    this.item.price = this.editForm.get(['price'])!.value

    this.confirm && this.confirm(this.item);
    this.invoiceItemService.confirm();
    this.activeModal.close()

  }

  onConfirmClicked(): void {

  }
}
