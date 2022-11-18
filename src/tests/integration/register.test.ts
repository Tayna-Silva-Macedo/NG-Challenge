import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';

import Account from '../../database/models/Account';
import User from '../../database/models/User';

import {
  userCreated,
  userFind,
  createUserInvalidUsername,
  createUserInvalidPassword,
  createUserValid,
} from './mocks/user';

import { Response } from 'superagent';
import app from '../../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /register', function () {
  describe('Verifica se não é possível cadastrar um usuário com username com menos de 3 caracteres', function () {
    let responseRegister: Response;

    before(async () => {
      responseRegister = await chai
        .request(app)
        .post('/register')
        .send(createUserInvalidUsername);
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

  // describe('Verifica se não é possível cadastrar um usuário com senha inválida', function () {
  //   it('', function () {});
  // });

  // describe('Verifica se não é possível cadastrar um usuário com username que já existe', function () {
  //   it('', function () {});
  // });

  // describe('Verifica se é possível cadastrar um usuário com sucesso', function () {
  //   it('', function () {});
  // });
});
