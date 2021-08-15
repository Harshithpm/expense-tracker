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
  total: number = 0;
  income = 0;
  expense = 0;

  constructor(public transactionStore: TransactionStoreService) {
    const observer: PartialObserver<Transaction[]> = {
      next: (x: Transaction[]) => {
        this.transactions = x.slice(Math.max(x.length - 3, 0)).reverse();
        const amounts = x.map((transaction) => transaction.amount);
        this.total = amounts.reduce((acc, item) => (acc += item), 0);
        this.income = amounts
          .filter((inc) => inc > 0)
          .reduce((acc, item) => (acc += item), 0);
        this.expense =
          amounts
            .filter((exp) => exp < 0)
            .reduce((acc, item) => (acc += item), 0) * -1;
      },
      error: (err: Error) => console.error('Error: ' + err),
      complete: () => {},
    };
    transactionStore.transactions$.subscribe(observer);
  }
}
