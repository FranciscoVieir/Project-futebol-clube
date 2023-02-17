import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Matches';
import {
  matches,
  sendUpdateMatch,
  notFound
} from './mocks/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;

it('Verifica se retorna uma menssagem de erro com status 40, caso não seja passado um token como parametro', async function () {
  const result = await chai.request(app).post('/matches').send(notFound)

  expect(result.status).to.be.equal(400)
  expect(result.body.message).to.deep.equal('Token not found')
})

describe('Verifica se é retornado a lista toda com todos os times', () => {
  it('Verifica se retorna todas as partidas com status 200', async () => {

    sinon.stub(Match, 'findAll').resolves(matches as any);

    const response = await chai.request(app).get('/matches');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(matches);
  });
});

describe('Verifica o tipo de propriedades do body do json', () => {
  it('Verificando corpo da requisição', async () => {
    const response = await chai.request(app).get('/matches');

    expect(response.status).to.equal(200);

    expect(response.body).to.be.an('array');

    expect(response.body[0]).to.be.an('object');

    expect(response.body[0]).to.have.property('id');

    expect(response.body[0]).to.have.property('homeTeamId');

    expect(response.body[0]).to.have.property('homeTeamGoals');

    expect(response.body[0]).to.have.property('awayTeamId');

    expect(response.body[0]).to.have.property('awayTeamGoals');

    expect(response.body[0]).to.have.property('inProgress');
  });
});

describe('Verificando se a rota sofre a atualização', () => {
  beforeEach(sinon.restore);
  it('Verficiando se retorna status 200 com mensagem "Finished"', async () => {

    sinon.stub(Match, 'update');

    const response = await chai.request(app).patch('/matches/1/finish');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ message: 'Finished' });
  });

})

describe('Verificando se a rota sofre upddate após sofrer a mudança', () => {
  beforeEach(sinon.restore);
  it('Verificando seretorna status 200 com mensagem "Finished"', async () => {

    sinon.stub(Match, 'update');

    const response = await chai.request(app).patch('/matches/1').send(sendUpdateMatch);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ message: 'Match is updated' });
  });

  it('Verifica se retorna todas as partidas finalizadas', async () => {
    const result = matches.filter((item) => !item.inProgress);
    sinon.stub(Match, 'findAll').resolves(result as any as Match[]);

    const response = await chai.request(app).get('/matches?inProgress=false')
    expect(response.status).to.equal(500);
    expect(response.body).to.deep.equal({});
  });
})
