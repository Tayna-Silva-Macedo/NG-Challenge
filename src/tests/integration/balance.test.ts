import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http'

import Account from '../../database/models/Account';
import User from '../../database/models/User';

import { accountMock, userCreatedMock, userMock } from './mocks/balance';

import { Response } from 'superagent';
import app from '../../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /balance', () => {
  describe('Verifica se é retornado o saldo na conta corretamente', () => {
    let responseRegister: Response;
    let responseLogin: Response;
    let responseBalance: Response;

    before(async () => {
      sinon.stub(User, 'create').resolves(userCreatedMock as User);
      sinon.stub(User, 'findOne').resolves(userMock as User);
      sinon.stub(Account, 'create').resolves();
      sinon.stub(Account, 'findByPk').resolves(accountMock as Account);

      responseRegister = await chai.request(app).post('/register').send({
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
