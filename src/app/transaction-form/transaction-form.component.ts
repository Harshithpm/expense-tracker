import { Component } from '@angular/core';
import { TransactionStoreService } from '../transaction-store.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
})
export class TransactionFormComponent {

  transactionText: string = "";
  transactionAmount: number = 0;

  constructor(public transactionStore: TransactionStoreService) {}

  submitHandler(): void {
    this.transactionStore.addTransaction({ id: 0, text: this.transactionText, amount: this.transactionAmount });
    this.transactionText = "";
    this.transactionAmount = 0;
  }

}
