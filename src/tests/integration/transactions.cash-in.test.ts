import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';

import Account from '../../database/models/Account';
import User from '../../database/models/User';

import { accountOutput } from './mocks/account';
import { userCreated, userFind } from './mocks/user';
import { allTransactionsCashInFilterOutput, allTransactionsCashInOutputString, allTransactionsCashInOutputDate, allTransactionsFilterOutput, allTransactionsOutputString, allTransactionsOutputDate } from './mocks/transaction'

import { Response } from 'superagent';
import app from '../../app';
import Transaction from '../../database/models/Transaction';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /transactions/cash-in', () => {
  describe('Verifica se é possível listar as transferências de cash-in com sucesso', () => {
    let responseLogin: Response;
    let responseTransaction: Response;

    before(async () => {
      sinon
        .stub(User, 'create').resolves(userCreated as User)
      sinon
        .stub(User, 'findOne')
        .onCall(0)
        .resolves(null)
        .onCall(1)
        .resolves(userFind as User)
      sinon
        .stub(Account, 'create').resolves(accountOutput as Account)
      sinon.stub(Transaction, 'findAll').resolves(allTransactionsCashInOutputDate as Transaction[]);

      await chai.request(app).post('/register').send({
        username: 'taynasm',
        password: '1234567AbC',
      });

      responseLogin = await chai.request(app).post('/login').send({
        username: 'taynasm',
        password: '1234567AbC',
      });

      const token = responseLogin.body.token;

      responseTransaction = await chai
        .request(app)
        .get('/transactions/cash-in')
        .set('authorization', token);
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(responseTransaction.status).to.be.equal(200);
    });

    it('retorna a transferência criada', () => {
      expect(responseTransaction.body).to.be.deep.equal(allTransactionsCashInOutputString);
    });
  });

  describe('Verifica se é possível listar as transferências cash-in filtrando pela data', () => {
    let responseLogin: Response;
    let responseTransaction: Response;

    before(async () => {
      sinon
        .stub(User, 'create').resolves(userCreated as User)
      sinon
        .stub(User, 'findOne')
        .onCall(0)
        .resolves(null)
        .onCall(1)
        .resolves(userFind as User)
      sinon
        .stub(Account, 'create').resolves(accountOutput as Account)
      sinon.stub(Transaction, 'findAll').resolves(allTransactionsCashInOutputDate as Transaction[]);

      await chai.request(app).post('/register').send({
        username: 'taynasm',
        password: '1234567AbC',
      });

      responseLogin = await chai.request(app).post('/login').send({
        username: 'taynasm',
        password: '1234567AbC',
      });

      const token = responseLogin.body.token;

      responseTransaction = await chai
        .request(app)
        .get('/transactions/cash-in?date=2022-11-18')
        .set('authorization', token);
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(responseTransaction.status).to.be.equal(200);
    });

    it('retorna a transferência criada', () => {
      expect(responseTransaction.body).to.be.deep.equal(allTransactionsCashInFilterOutput);
    });
  });
});
