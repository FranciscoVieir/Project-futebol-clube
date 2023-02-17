import { IMatches, ISimpleMatches } from '../interfaces/index';
import MatchModel from '../database/models/Matches';
import TeamModel from '../database/models/Teams';

export async function getAllMatchService(inProgress: string) {
  const allMatchesFound = await MatchModel.findAll({
    include: [
      {
        model: TeamModel,
        as: 'homeTeam',
        attributes: { exclude: ['id'] },
      },
      { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ],
  });
  const matches = allMatchesFound.map((match) => match.dataValues);
  if (inProgress === 'true') {
    return matches.filter((match) => match.inProgress === true);
  }
  if (inProgress === 'false') {
    return matches.filter((match) => match.inProgress === false);
  }
  return allMatchesFound;
}

export async function creatingMatchService(match: IMatches) {
  const creatingAMatch = await MatchModel.create({
    ...match,
    inProgress: true,
  });

  return creatingAMatch;
}

export async function updateFinishService(id: number) {
  const finishedResult = await MatchModel.update({ inProgress: false }, { where: { id } });
  return finishedResult;
}

export async function updateGoalsService(match: ISimpleMatches, id: number) {
  const { homeTeamGoals, awayTeamGoals } = match;

  const resultModel = await MatchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  return resultModel;
}
