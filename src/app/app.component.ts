import { Component } from '@angular/core';
import { PartialObserver } from 'rxjs';
import {
  Transaction,
  TransactionStoreService,
} from './transaction-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'expense-tracker';
  transactions: Transaction[] = [];

  constructor(public transactionStore: TransactionStoreService) {
    const observer: PartialObserver<Transaction[]> = {
      next: (x: Transaction[]) => {
        this.transactions = x.slice(Math.max(x.length - 3, 0)).reverse();
      },
      error: (err: Error) => console.error('Error: ' + err),
      complete: () => {},
    };
    transactionStore.transactions$.subscribe(observer);
  }
}
