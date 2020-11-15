import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    const outcomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );
    const income =
      incomeTransactions.length !== 0
        ? incomeTransactions
            .map(transaction => transaction.value)
            .reduce((accumulator, value) => accumulator + value)
        : 0;
    const outcome =
      outcomeTransactions.length !== 0
        ? outcomeTransactions
            .map(transaction => transaction.value)
            .reduce((accumulator, value) => accumulator + value)
        : 0;
    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
