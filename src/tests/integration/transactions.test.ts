import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';

import Account from '../../database/models/Account';
import User from '../../database/models/User';

import { accountOutput, accountOutput2 } from './mocks/account';
import { userCreated, userCreated2, userFind, userFind2 } from './mocks/user';
import { allTransactionsFilterOutput, allTransactionsOutputString, allTransactionsOutputDate, transactionCreated } from './mocks/transaction'

import { Response } from 'superagent';
import app from '../../app';
import Transaction from '../../database/models/Transaction';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /transactions', () => {
  describe('Verifica que não é possível fazer uma transferência para si mesmo', () => {
    let responseLogin: Response;
    let responseTransaction: Response;

    before(async () => {
      sinon.stub(User, 'create').resolves(userCreated as User);
      sinon
        .stub(User, 'findOne')
        .onFirstCall()
        .resolves(null)
        .onSecondCall()
        .resolves(userFind as User);
      sinon.stub(Account, 'create').resolves(accountOutput as Account);

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
        .post('/transactions')
        .set('authorization', token)
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
    let responseLogin: Response;
    let responseTransaction: Response;

    before(async () => {
      sinon
        .stub(User, 'create')
        .onFirstCall()
        .resolves(userCreated as User)
        .onSecondCall()
        .resolves(userCreated2 as User);
      sinon
        .stub(User, 'findOne')
        .onFirstCall()
        .resolves(null)
        .onSecondCall()
        .resolves(null)
        .onThirdCall()
        .resolves(userFind as User);
      sinon
        .stub(Account, 'create')
        .onFirstCall()
        .resolves(accountOutput as Account)
        .onSecondCall()
        .resolves(accountOutput2 as Account);
      sinon.stub(Account, 'findByPk').resolves(accountOutput as Account);

      await chai.request(app).post('/register').send({
        username: 'taynasm',
        password: '1234567AbC',
      });

      await chai.request(app).post('/register').send({
        username: 'cdvania',
        password: 'AbCdEfG123',
      });

      responseLogin = await chai.request(app).post('/login').send({
        username: 'taynasm',
        password: '1234567AbC',
      });

      const token = responseLogin.body.token;

      responseTransaction = await chai
        .request(app)
        .post('/transactions')
        .set('authorization', token)
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
    let responseLogin: Response;
    let responseTransaction: Response;

    before(async () => {
      sinon
        .stub(User, 'create')
        .onFirstCall()
        .resolves(userCreated as User)
        .onSecondCall()
        .resolves(userCreated2 as User);
      sinon
        .stub(User, 'findOne')
        .onCall(0)
        .resolves(null)
        .onCall(1)
        .resolves(null)
        .onCall(2)
        .resolves(userFind as User)
        .onCall(3)
        .resolves(userFind2 as User);
      sinon
        .stub(Account, 'create')
        .onFirstCall()
        .resolves(accountOutput as Account)
        .onSecondCall()
        .resolves(accountOutput2 as Account);
      sinon.stub(Account, 'findByPk').resolves(accountOutput as Account);
      sinon.stub(Account, 'decrement').resolves();
      sinon.stub(Account, 'increment').resolves();
      sinon.stub(Transaction, 'create').resolves(transactionCreated as Transaction);

      await chai.request(app).post('/register').send({
        username: 'taynasm',
        password: '1234567AbC',
      });

      await chai.request(app).post('/register').send({
        username: 'cdvania',
        password: 'AbCdEfG123',
      });

      responseLogin = await chai.request(app).post('/login').send({
        username: 'taynasm',
        password: '1234567AbC',
      });

      const token = responseLogin.body.token;

      responseTransaction = await chai
        .request(app)
        .post('/transactions')
        .set('authorization', token)
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
      sinon.stub(Transaction, 'findAll').resolves(allTransactionsOutputDate as Transaction[]);

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
        .get('/transactions')
        .set('authorization', token);
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(responseTransaction.status).to.be.equal(200);
    });

    it('retorna todas as transferências', () => {
      expect(responseTransaction.body).to.be.deep.equal(allTransactionsOutputString);
    });
  });

  describe('Verifica se é possível listar todas as transferências filtrando pela data', () => {
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
      sinon.stub(Transaction, 'findAll').resolves(allTransactionsOutputDate as Transaction[]);

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
        .get('/transactions?date=2022-11-18')
        .set('authorization', token);    
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(responseTransaction.status).to.be.equal(200);
    });

    it('retorna todas as transferências filtrando pela data', () => {
      expect(responseTransaction.body).to.be.deep.equal(allTransactionsFilterOutput);
    });
  });
});
