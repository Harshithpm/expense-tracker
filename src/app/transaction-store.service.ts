import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Transaction = {
  id: number;
  text: string;
  amount: number;
};

@Injectable({
  providedIn: 'root',
})
export class TransactionStoreService {
  private readonly _transactions = new BehaviorSubject<Transaction[]>([]);

  readonly transactions$ = this._transactions.asObservable();

  get transactions(): Transaction[] {
    return this._transactions.getValue();
  }

  private set transactions(val: Transaction[]) {
    this._transactions.next(val);
  }

  getLastThreeTransactions() {
    return this._transactions
      .getValue()
      .slice(Math.max(this._transactions.getValue().length - 3, 0));
  }

  addTransaction(transaction: Transaction) {
    this.transactions = [
      ...this.transactions,
      {
        id: this.transactions.length + 1,
        text: transaction.text,
        amount: transaction.amount,
      },
    ];
  }

  removeTransaction(id: number) {
    this.transactions = this.transactions.filter(
      (transaction) => transaction.id !== id
    );
  }
}
