import { NextFunction, Request, Response } from 'express';
import { getById } from '../services/teamService';

const MatchValidation = async (request: Request, response: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = request.body;

  const firstTeamId = await getById(Number(homeTeamId));
  const secondTeamId = await getById(Number(awayTeamId));

  if (homeTeamId === awayTeamId) {
    return response.status(422).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }

  if ((!firstTeamId) || (!secondTeamId)) {
    return response.status(404).json({ message: 'There is no team with such id!' });
  }

  return next();
};

export default MatchValidation;
