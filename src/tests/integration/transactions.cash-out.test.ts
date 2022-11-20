import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';

import Transaction from '../../database/models/Transaction';

import { validToken } from './mocks/user';
import {
  allTransactionsCashOutOutputDate,
  allTransactionsCashOutOutputString,
  allTransactionsCashOutFilterOutput,
} from './mocks/transaction';

import { Response } from 'superagent';
import app from '../../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /transactions/cash-out', () => {
  describe('Verifica se é possível listar as transferências de cash-out com sucesso', () => {
    let responseTransaction: Response;

    before(async () => {
      sinon
        .stub(Transaction, 'findAll')
        .resolves(allTransactionsCashOutOutputDate as Transaction[]);

      responseTransaction = await chai
        .request(app)
        .get('/transactions/cash-out')
        .set('authorization', validToken);
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
    let responseTransaction: Response;

    before(async () => {
      sinon
        .stub(Transaction, 'findAll')
        .resolves(allTransactionsCashOutOutputDate as Transaction[]);

      responseTransaction = await chai
        .request(app)
        .get('/transactions/cash-out?date=2022-11-18')
        .set('authorization', validToken);
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
