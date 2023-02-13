import { Request, Response, NextFunction } from 'express';
import * as TeamService from '../services/teamService';

export async function getAll(_request: Request, response: Response, next: NextFunction) {
  try {
    const allTeams = await TeamService.getAll();
    return response.status(200).json(allTeams);
  } catch (err) {
    next(err);
  }
}

export async function getById(request: Request, response: Response, next: NextFunction) {
  try {
    const { id } = request.params;

    const teamId = await TeamService.getById(Number(id));
    if (!teamId) return response.status(404).json({ message: 'Team not found' });
    return response.status(200).json(teamId);
  } catch (err) {
    next(err);
  }
}
