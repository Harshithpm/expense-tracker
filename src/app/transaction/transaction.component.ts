import { Component, Input } from '@angular/core';
import {
  Transaction,
  TransactionStoreService,
} from '../transaction-store.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent {
  @Input() transaction: Transaction = { id: 0, text: '', amount: 0 };
  sign: string = '';

  constructor(public transactionStore: TransactionStoreService) {
    this.sign = this.transaction.amount < 0 ? '-' : '+';
  }
}
