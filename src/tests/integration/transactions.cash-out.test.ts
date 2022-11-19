import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';

import Account from '../../database/models/Account';
import User from '../../database/models/User';

import { accountOutput } from './mocks/account';
import { userCreated, userFind } from './mocks/user';
import {
  allTransactionsCashOutOutputDate,
  allTransactionsCashOutOutputString,
  allTransactionsCashOutFilterOutput,
} from './mocks/transaction';

import { Response } from 'superagent';
import app from '../../app';
import Transaction from '../../database/models/Transaction';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /transactions/cash-out', () => {
  describe('Verifica se é possível listar as transferências de cash-out com sucesso', () => {
    let responseLogin: Response;
    let responseTransaction: Response;

    before(async () => {
      sinon.stub(User, 'create').resolves(userCreated as User);
      sinon
        .stub(User, 'findOne')
        .onCall(0)
        .resolves(null)
        .onCall(1)
        .resolves(userFind as User);
      sinon.stub(Account, 'create').resolves(accountOutput as Account);
      sinon
        .stub(Transaction, 'findAll')
        .resolves(allTransactionsCashOutOutputDate as Transaction[]);

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
        .get('/transactions/cash-out')
        .set('authorization', token);
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(responseTransaction.status).to.be.equal(200);
    });

    it('retorna todas as transferência cash-out', () => {
      expect(responseTransaction.body).to.be.deep.equal(
        allTransactionsCashOutOutputString
      );
    });
  });

  describe('Verifica se é possível listar as transferências cash-out filtrando pela data', () => {
    let responseLogin: Response;
    let responseTransaction: Response;

    before(async () => {
      sinon.stub(User, 'create').resolves(userCreated as User);
      sinon
        .stub(User, 'findOne')
        .onCall(0)
        .resolves(null)
        .onCall(1)
        .resolves(userFind as User);
      sinon.stub(Account, 'create').resolves(accountOutput as Account);
      sinon
        .stub(Transaction, 'findAll')
        .resolves(allTransactionsCashOutOutputDate as Transaction[]);

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
        .get('/transactions/cash-out?date=2022-11-18')
        .set('authorization', token);
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(responseTransaction.status).to.be.equal(200);
    });

    it('retorna todas as transferências cash-out filtrando pela data', () => {
      expect(responseTransaction.body).to.be.deep.equal(
        allTransactionsCashOutFilterOutput
      );
    });
  });
});
