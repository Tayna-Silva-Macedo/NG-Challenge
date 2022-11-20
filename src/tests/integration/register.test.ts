import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';

import Account from '../../database/models/Account';
import User from '../../database/models/User';

import { userCreated, userFind } from './mocks/user';

import { accountOutput } from './mocks/account';

import { Response } from 'superagent';
import app from '../../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /register', function () {
  describe('Verifica se não é possível cadastrar um usuário com username com menos de 3 caracteres', function () {
    let responseRegister: Response;

    before(async () => {
      responseRegister = await chai.request(app).post('/register').send({
        username: 'ta',
        password: '1234567AbC',
      });
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 400', () => {
      expect(responseRegister.status).to.be.equal(400);
    });

    it('retorna uma mensagem de erro', () => {
      expect(responseRegister.body).to.be.deep.equal({
        message: 'username must be at least 3 characters',
      });
    });
  });

  describe('Verifica se não é possível cadastrar um usuário com senha inválida', function () {
    let responseRegister: Response;

    before(async () => {
      responseRegister = await chai.request(app).post('/register').send({
        username: 'taynasm',
        password: '123',
      });
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 400', () => {
      expect(responseRegister.status).to.be.equal(400);
    });

    it('retorna uma mensagem de erro', () => {
      expect(responseRegister.body).to.be.deep.equal({
        message: 'invalid password',
      });
    });
  });

  describe('Verifica se não é possível cadastrar um usuário com username que já existe', function () {
    let responseRegister: Response;

    before(async () => {
      sinon.stub(User, 'findOne').resolves(userFind as User);

      responseRegister = await chai.request(app).post('/register').send({
        username: 'taynasm',
        password: '1234567AbC',
      });
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 409', () => {
      expect(responseRegister.status).to.be.equal(409);
    });

    it('retorna uma mensagem de erro', () => {
      expect(responseRegister.body).to.be.deep.equal({
        message: 'user already registered',
      });
    });
  });

  describe('Verifica se é possível cadastrar um usuário com sucesso', function () {
    let responseRegister: Response;

    before(async () => {
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User, 'create').resolves(userCreated as User);
      sinon.stub(Account, 'create').resolves(accountOutput as Account);

      responseRegister = await chai.request(app).post('/register').send({
        username: 'taynasm',
        password: '1234567AbC',
      });
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 201', () => {
      expect(responseRegister.status).to.be.equal(201);
    });

    it('retorna o usuário criado', () => {
      expect(responseRegister.body).to.be.deep.equal(userCreated);
    });
  });
});
