import * as Sinon from 'sinon';
import * as chai from 'chai';
import TeamModel from '../database/models/Teams';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { allTeams } from './mocks/teamsMock';
// console.log(allTeams[2])

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica se a rota "/team" renderiza a lista toda de times', function () {
  beforeEach(Sinon.restore);

  it('Verifica se os times retornam com status 200', async function () {

    Sinon.stub(TeamModel, 'findAll').resolves(allTeams as TeamModel[]);

    const result = await chai.request(app).get('/teams');

    expect(result.status).to.equal(200);
    expect(result.body).to.deep.equal(allTeams);
  });

  it('Verifica se a lista retorna o time correto de acordo com o "id" passado no parametro"', async function () {

    Sinon.stub(TeamModel, 'findOne').resolves(allTeams[2] as TeamModel);

    const result = await chai.request(app).get('/teams/3');

    expect(result.status).to.equal(200);
    expect(result.body).to.deep.equal(allTeams[2]);
  });

  it('Verifica se for passado o "id" errado, é retornado uma mensagem "Team not found" com o status "404"', async function () {

    Sinon.stub(TeamModel, 'findOne').resolves(undefined);

    const result = await chai.request(app).get('/teams/10000');

    expect(result.status).to.equal(404);
    expect(result.body).to.deep.equal({ message: 'Team not found' });
  });
});


