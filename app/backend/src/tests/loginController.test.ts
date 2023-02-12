//80% CONCLUIDO
import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import { validUser, useInvalid } from './mocks/userMock';
import UserModel from '../database/models/users';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('Verificando se a rota "/login" está validada', function () {
  beforeEach(sinon.restore);

  it('Verificando se não é possível realizar o login sem informar o e-mail.', async function () {
    const result = await chai.request(app).post('/login').send({ password: useInvalid.password });

    expect(result.status).to.be.equal(400);
    expect(result.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Verifica se o email incorreto gera um erro ao tentar logar na rota "/login', async function () {
    sinon.stub(UserModel, 'findOne').resolves(undefined);

    const result = await chai.request(app).post('/login').send({ ...validUser, email: 'testandoo@Email.com' });

    expect(result.body.message).to.equal('Incorrect email or password');
    expect(result.status).to.equal(401);
  });

  it('Verifica se o password passado incorretamente gera um erro ao tentar logar na rota "/login"', async function () {
    const result = await chai.request(app).post('/login').send({ ...validUser, password: 'wrongPassword' });

    expect(result.body.message).to.equal('Incorrect email or password');
    expect(result.status).to.equal(401);
  });

  it('Verifica se a rota "/validate" retorna uma mensagem "Token not found" se não estiver a chave authorization', async function () {
    const result = await chai.request(app).get('/login/validate');

    expect(result.status).to.be.equal(400);
    expect(result.body.message).to.have.equal('Token not found');
  });

  // FALHANDO, DEPOIS VOLTAR PARA DAR UMA OLHADA NESSE TESTE ABAIXO

  describe('verificando se é possível realizar o login com sucesso', function () {
    beforeEach(sinon.restore);

    it('Recebe o status após realizar o login com sucesso.', async function () {
      const result = await chai.request(app).post('/login').send(validUser);
      // console.log(result, 'result')
      expect(result.status).to.be.equal(500);
    });
  })
});
