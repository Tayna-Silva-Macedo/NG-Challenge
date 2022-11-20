import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';

import Account from '../../database/models/Account';
import User from '../../database/models/User';
import Transaction from '../../database/models/Transaction';

import { accountOutput } from './mocks/account';
import { userFind2, validToken } from './mocks/user';
import {
  allTransactionsFilterOutput,
  allTransactionsOutputString,
  allTransactionsOutputDate,
  transactionCreated,
} from './mocks/transaction';

import { Response } from 'superagent';
import app from '../../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /transactions', () => {
  describe('Verifica que não é possível fazer uma transferência para si mesmo', () => {
    let responseTransaction: Response;

    before(async () => {
      responseTransaction = await chai
        .request(app)
        .post('/transactions')
        .set('authorization', validToken)
        .send({
          username: 'taynasm',
          value: 50,
        });
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 400', () => {
      expect(responseTransaction.status).to.be.equal(400);
    });

    it('retorna mensagem de erro', () => {
      expect(responseTransaction.body).to.be.deep.equal({
        message: 'cannot transfer to yourself',
      });
    });
  });

  describe('Verifica que não é possível fazer uma transferência quando o saldo é insuficiente', () => {
    let responseTransaction: Response;

    before(async () => {
      sinon.stub(Account, 'findByPk').resolves(accountOutput as Account);

      responseTransaction = await chai
        .request(app)
        .post('/transactions')
        .set('authorization', validToken)
        .send({
          username: 'cdvania',
          value: 1000,
        });
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 400', () => {
      expect(responseTransaction.status).to.be.equal(400);
    });

    it('retorna mensagem de erro', () => {
      expect(responseTransaction.body).to.be.deep.equal({
        message: 'insufficient funds',
      });
    });
  });

  describe('Verifica se é possível realizar uma transferência com sucesso', () => {
    let responseTransaction: Response;

    before(async () => {
      sinon.stub(Account, 'findByPk').resolves(accountOutput as Account);
      sinon.stub(User, 'findOne').resolves(userFind2 as User);
      sinon.stub(Account, 'decrement').resolves();
      sinon.stub(Account, 'increment').resolves();
      sinon
        .stub(Transaction, 'create')
        .resolves(transactionCreated as Transaction);

      responseTransaction = await chai
        .request(app)
        .post('/transactions')
        .set('authorization', validToken)
        .send({
          username: 'cdvania',
          value: 50,
        });
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 201', () => {
      expect(responseTransaction.status).to.be.equal(201);
    });

    it('retorna a transferência criada', () => {
      expect(responseTransaction.body).to.be.deep.equal(transactionCreated);
    });
  });

  describe('Verifica se é possível listar todas as transferências com sucesso', () => {
    let responseTransaction: Response;

    before(async () => {
      sinon
        .stub(Transaction, 'findAll')
        .resolves(allTransactionsOutputDate as Transaction[]);

      responseTransaction = await chai
        .request(app)
        .get('/transactions')
        .set('authorization', validToken);
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(responseTransaction.status).to.be.equal(200);
    });

    it('retorna todas as transferências', () => {
      expect(responseTransaction.body).to.be.deep.equal(
        allTransactionsOutputString
      );
    });
  });

  describe('Verifica se é possível listar todas as transferências filtrando pela data', () => {
    let responseTransaction: Response;

    before(async () => {
      sinon
        .stub(Transaction, 'findAll')
        .resolves(allTransactionsOutputDate as Transaction[]);

      responseTransaction = await chai
        .request(app)
        .get('/transactions?date=2022-11-18')
        .set('authorization', validToken);
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(responseTransaction.status).to.be.equal(200);
    });

    it('retorna todas as transferências filtrando pela data', () => {
      expect(responseTransaction.body).to.be.deep.equal(
        allTransactionsFilterOutput
      );
    });
  });
});
