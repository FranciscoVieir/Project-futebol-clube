import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import leaderboardMock from './mocks/leaderbordMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica se a rota "/leaderboard" renderiza a tabela', () => {

  it('Verifica se retorna a tabela com um status 200', async () => {
    const response = await chai.request(app).get('/leaderboard')
    expect(response.status).to.equal(200)
    expect(response.body).to.deep.equal(leaderboardMock)
  })

});