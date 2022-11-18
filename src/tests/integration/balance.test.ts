import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';

import Account from '../../database/models/Account';
import User from '../../database/models/User';

import { accountOutput } from './mocks/account';
import { userCreated, userFind } from './mocks/user';

import { Response } from 'superagent';
import app from '../../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /balance', () => {
  describe('Verifica se não é retornado o saldo quando o token não é fornecido', () => {
    let responseBalance: Response;

    before(async () => {
      responseBalance = await chai.request(app).get('/balance');
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 401', () => {
      expect(responseBalance.status).to.be.equal(401);
    });

    it('retorna mensagem de erro', () => {
      expect(responseBalance.body).to.be.deep.equal({
        message: 'Token not found',
      });
    });
  });

  describe('Verifica se não é retornado o saldo quando o token é inválido', () => {
    let responseBalance: Response;

    before(async () => {
      responseBalance = await chai
        .request(app)
        .get('/balance')
        .set('authorization', 'invalid_token');
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 401', () => {
      expect(responseBalance.status).to.be.equal(401);
    });

    it('retorna mensagem de erro', () => {
      expect(responseBalance.body).to.be.deep.equal({
        message: 'Token must be a valid token',
      });
    });
  });

  describe('Verifica se é retornado o saldo na conta corretamente', () => {
    let responseLogin: Response;
    let responseBalance: Response;

    before(async () => {
      sinon.stub(User, 'create').resolves(userCreated as User);
      sinon
        .stub(User, 'findOne')
        .onFirstCall()
        .resolves(null)
        .onSecondCall()
        .resolves(userFind as User);
      sinon.stub(Account, 'create').resolves(accountOutput as Account);
      sinon.stub(Account, 'findByPk').resolves(accountOutput as Account);

      await chai.request(app).post('/register').send({
        username: 'taynasm',
        password: '1234567AbC',
      });

      responseLogin = await chai.request(app).post('/login').send({
        username: 'taynasm',
        password: '1234567AbC',
      });

      const token = responseLogin.body.token;

      responseBalance = await chai
        .request(app)
        .get('/balance')
        .set('authorization', token);
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(responseBalance.status).to.be.equal(200);
    });

    it('retorna o saldo da conta', () => {
      expect(responseBalance.body).to.be.deep.equal({ balance: 100 });
    });
  });
});
