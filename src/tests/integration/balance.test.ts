import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';

import Account from '../../database/models/Account';
import User from '../../database/models/User';

import { accountOutput } from './mocks/account';
import { userFind, validToken } from './mocks/user';

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
    let responseBalance: Response;

    before(async () => {
      sinon.stub(User, 'findOne').resolves(userFind as User);
      sinon.stub(Account, 'findByPk').resolves(accountOutput as Account);

      responseBalance = await chai
        .request(app)
        .get('/balance')
        .set('authorization', validToken);
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
