const transactionCreated = {
  id: 1,
  debitedAccountId: 1,
  creditedAccountId: 2,
  value: 50,
  createdAt: '2022-11-19T14:19:39.448Z' as unknown as Date,
};

const allTransactionsOutputString = [
  {
    id: 1,
    debitedAccountId: 1,
    creditedAccountId: 3,
    value: 50,
    createdAt: '2022-11-18T22:17:12.687Z' as unknown as Date,
  },
  {
    id: 2,
    debitedAccountId: 1,
    creditedAccountId: 4,
    value: 10,
    createdAt: '2022-11-19T22:17:38.345Z' as unknown as Date,
  },
  {
    id: 3,
    debitedAccountId: 1,
    creditedAccountId: 5,
    value: 3,
    createdAt: '2022-11-18T22:17:49.922Z' as unknown as Date,
  },
  {
    id: 4,
    debitedAccountId: 5,
    creditedAccountId: 1,
    value: 75,
    createdAt: '2022-11-19T22:18:23.591Z' as unknown as Date,
  },
  {
    id: 8,
    debitedAccountId: 3,
    creditedAccountId: 1,
    value: 50,
    createdAt: '2022-11-18T22:19:59.805Z' as unknown as Date,
  },
  {
    id: 9,
    debitedAccountId: 4,
    creditedAccountId: 1,
    value: 200,
    createdAt: '2022-11-20T22:21:08.900Z' as unknown as Date,
  },
];

const allTransactionsOutputDate = [
  {
    id: 1,
    debitedAccountId: 1,
    creditedAccountId: 3,
    value: 50,
    createdAt: new Date('2022-11-18T22:17:12.687Z'),
  },
  {
    id: 2,
    debitedAccountId: 1,
    creditedAccountId: 4,
    value: 10,
    createdAt: new Date('2022-11-19T22:17:38.345Z'),
  },
  {
    id: 3,
    debitedAccountId: 1,
    creditedAccountId: 5,
    value: 3,
    createdAt: new Date('2022-11-18T22:17:49.922Z'),
  },
  {
    id: 4,
    debitedAccountId: 5,
    creditedAccountId: 1,
    value: 75,
    createdAt: new Date('2022-11-19T22:18:23.591Z'),
  },
  {
    id: 8,
    debitedAccountId: 3,
    creditedAccountId: 1,
    value: 50,
    createdAt: new Date('2022-11-18T22:19:59.805Z'),
  },
  {
    id: 9,
    debitedAccountId: 4,
    creditedAccountId: 1,
    value: 200,
    createdAt: new Date('2022-11-20T22:21:08.900Z'),
  },
];

const allTransactionsFilterOutput = [
  {
    id: 1,
    debitedAccountId: 1,
    creditedAccountId: 3,
    value: 50,
    createdAt: '2022-11-18T22:17:12.687Z' as unknown as Date,
  },
  {
    id: 3,
    debitedAccountId: 1,
    creditedAccountId: 5,
    value: 3,
    createdAt: '2022-11-18T22:17:49.922Z' as unknown as Date,
  },
  {
    id: 8,
    debitedAccountId: 3,
    creditedAccountId: 1,
    value: 50,
    createdAt: '2022-11-18T22:19:59.805Z' as unknown as Date,
  },
];

const allTransactionsCashInOutputString = [
  {
    id: 4,
    debitedAccountId: 5,
    creditedAccountId: 1,
    value: 75,
    createdAt: '2022-11-19T22:18:23.591Z' as unknown as Date,
  },
  {
    id: 8,
    debitedAccountId: 3,
    creditedAccountId: 1,
    value: 50,
    createdAt: '2022-11-18T22:19:59.805Z' as unknown as Date,
  },
  {
    id: 9,
    debitedAccountId: 4,
    creditedAccountId: 1,
    value: 200,
    createdAt: '2022-11-20T22:21:08.900Z' as unknown as Date,
  },
];

const allTransactionsCashInOutputDate = [
  {
    id: 4,
    debitedAccountId: 5,
    creditedAccountId: 1,
    value: 75,
    createdAt: new Date('2022-11-19T22:18:23.591Z'),
  },
  {
    id: 8,
    debitedAccountId: 3,
    creditedAccountId: 1,
    value: 50,
    createdAt: new Date('2022-11-18T22:19:59.805Z'),
  },
  {
    id: 9,
    debitedAccountId: 4,
    creditedAccountId: 1,
    value: 200,
    createdAt: new Date('2022-11-20T22:21:08.900Z'),
  },
];

const allTransactionsCashInFilterOutput = [
  {
    id: 8,
    debitedAccountId: 3,
    creditedAccountId: 1,
    value: 50,
    createdAt: '2022-11-18T22:19:59.805Z' as unknown as Date,
  },
];

const allTransactionsCashOutOutputString = [
  {
    id: 1,
    debitedAccountId: 1,
    creditedAccountId: 3,
    value: 50,
    createdAt: '2022-11-18T22:17:12.687Z' as unknown as Date,
  },
  {
    id: 2,
    debitedAccountId: 1,
    creditedAccountId: 4,
    value: 10,
    createdAt: '2022-11-19T22:17:38.345Z' as unknown as Date,
  },
  {
    id: 3,
    debitedAccountId: 1,
    creditedAccountId: 5,
    value: 3,
    createdAt: '2022-11-18T22:17:49.922Z' as unknown as Date,
  },
];

const allTransactionsCashOutOutputDate = [
  {
    id: 1,
    debitedAccountId: 1,
    creditedAccountId: 3,
    value: 50,
    createdAt: new Date('2022-11-18T22:17:12.687Z'),
  },
  {
    id: 2,
    debitedAccountId: 1,
    creditedAccountId: 4,
    value: 10,
    createdAt: new Date('2022-11-19T22:17:38.345Z'),
  },
  {
    id: 3,
    debitedAccountId: 1,
    creditedAccountId: 5,
    value: 3,
    createdAt: new Date('2022-11-18T22:17:49.922Z'),
  },
];

const allTransactionsCashOutFilterOutput = [
  {
    id: 1,
    debitedAccountId: 1,
    creditedAccountId: 3,
    value: 50,
    createdAt: '2022-11-18T22:17:12.687Z' as unknown as Date,
  },
  {
    id: 3,
    debitedAccountId: 1,
    creditedAccountId: 5,
    value: 3,
    createdAt: '2022-11-18T22:17:49.922Z' as unknown as Date,
  },
];

export {
  transactionCreated,
  allTransactionsOutputString,
  allTransactionsOutputDate,
  allTransactionsFilterOutput,
  allTransactionsCashInOutputString,
  allTransactionsCashInOutputDate,
  allTransactionsCashInFilterOutput,
  allTransactionsCashOutOutputString,
  allTransactionsCashOutOutputDate,
  allTransactionsCashOutFilterOutput,
};
