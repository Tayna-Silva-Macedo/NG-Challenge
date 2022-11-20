import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';

import Transaction from '../../database/models/Transaction';

import { validToken } from './mocks/user';
import {
  allTransactionsCashInFilterOutput,
  allTransactionsCashInOutputString,
  allTransactionsCashInOutputDate,
} from './mocks/transaction';

import { Response } from 'superagent';
import app from '../../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /transactions/cash-in', () => {
  describe('Verifica se é possível listar as transferências de cash-in com sucesso', () => {
    let responseTransaction: Response;

    before(async () => {
      sinon
        .stub(Transaction, 'findAll')
        .resolves(allTransactionsCashInOutputDate as Transaction[]);

      responseTransaction = await chai
        .request(app)
        .get('/transactions/cash-in')
        .set('authorization', validToken);
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(responseTransaction.status).to.be.equal(200);
    });

    it('retorna todas as transferência cash-in', () => {
      expect(responseTransaction.body).to.be.deep.equal(
        allTransactionsCashInOutputString
      );
    });
  });

  describe('Verifica se é possível listar as transferências cash-in filtrando pela data', () => {
    let responseTransaction: Response;

    before(async () => {
      sinon.stub(Transaction, 'findAll').resolves(allTransactionsCashInOutputDate as Transaction[]);

      responseTransaction = await chai
        .request(app)
        .get('/transactions/cash-in?date=2022-11-18')
        .set('authorization', validToken);
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(responseTransaction.status).to.be.equal(200);
    });

    it('retorna todas as transferências cash-in filtrando pela data', () => {
      expect(responseTransaction.body).to.be.deep.equal(
        allTransactionsCashInFilterOutput
      );
    });
  });
});
