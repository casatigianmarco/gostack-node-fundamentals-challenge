import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionRequest {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({
    title,
    value,
    type,
  }: CreateTransactionRequest): Transaction {
    const toLowerType = type.toLowerCase();
    if (toLowerType !== 'income' && toLowerType !== 'outcome') {
      throw Error(
        'Incorrect type of transaction: type must be income or outcome.',
      );
    }

    if (toLowerType === 'income') {
      return this.transactionsRepository.create({
        title,
        value,
        type: 'income',
      });
    }

    const balance = this.transactionsRepository.getBalance();
    if (value > balance.total) {
      throw Error('Transaction denied.');
    }
    return this.transactionsRepository.create({
      title,
      value,
      type: 'outcome',
    });
  }
}

export default CreateTransactionService;
