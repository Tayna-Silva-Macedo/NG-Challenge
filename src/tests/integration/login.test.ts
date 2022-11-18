import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';

import Account from '../../database/models/Account';
import User from '../../database/models/User';

import { userCreated } from './mocks/user';

import { accountOutput } from './mocks/account';

import { Response } from 'superagent';
import app from '../../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /login', function () {
  describe('Verifica se não é possível logar com um usuário que não existe', function () {
    let responseLogin: Response;

    before(async () => {
      sinon.stub(User, 'findOne').resolves(null);

      responseLogin = await chai.request(app).post('/login').send({
        username: 'taynasm',
        password: '1234567AbC',
      });
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 401', () => {
      expect(responseLogin.status).to.be.equal(401);
    });

    it('retorna uma mensagem de erro', () => {
      expect(responseLogin.body).to.be.deep.equal({
        message: 'incorrect email or password',
      });
    });
  });

  describe('Verifica se não é possível logar com uma senha inválida ', function () {
    let responseLogin: Response;

    before(async () => {
      sinon.stub(User, 'create').resolves(userCreated as User);
      sinon
        .stub(User, 'findOne')
        .onFirstCall()
        .resolves(null)
        .onSecondCall()
        .resolves(userCreated as User);
      sinon.stub(Account, 'create').resolves(accountOutput as Account);
      sinon.stub(Account, 'findByPk').resolves(accountOutput as Account);

      await chai.request(app).post('/register').send({
        username: 'taynasm',
        password: '1234567AbC',
      });

      responseLogin = await chai.request(app).post('/login').send({
        username: 'taynasm',
        password: '1234567ABC',
      });
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 401', () => {
      expect(responseLogin.status).to.be.equal(401);
    });

    it('retorna uma mensagem de erro', () => {
      expect(responseLogin.body).to.be.deep.equal({
        message: 'incorrect email or password',
      });
    });
  });

  describe('Verifica se ao logar com sucesso é retornado um token', function () {
    let responseLogin: Response;

    before(async () => {
      sinon.stub(User, 'create').resolves(userCreated as User);
      sinon
        .stub(User, 'findOne')
        .onFirstCall()
        .resolves(null)
        .onSecondCall()
        .resolves(userCreated as User);
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
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(responseLogin.status).to.be.equal(200);
    });

    it('retorna um token', () => {
      expect(responseLogin.body).to.have.property('token');
    });
  });
});
