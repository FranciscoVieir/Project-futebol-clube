import { NextFunction, Request, Response } from 'express';
import * as MatchService from '../services/matcheService';

export async function getAllMatch(request: Request, response: Response, next: NextFunction) {
  try {
    const { inProgress } = request.query;
    const getAllMatches = await MatchService.getAllMatchService(inProgress as string);

    return response.status(200).json(getAllMatches);
  } catch (error) {
    next(error);
  }
}

export async function creatingMatch(request: Request, response: Response, next: NextFunction) {
  try {
    const { ...requestJson } = request.body;

    const matcheCreated = await MatchService.creatingMatchService(requestJson);

    return response.status(201).json(matcheCreated);
  } catch (error) {
    next(error);
  }
}

export async function updateFinish(request: Request, response: Response, next: NextFunction) {
  try {
    const { id } = request.params;

    await MatchService.updateFinishService(Number(id));
    return response.status(200).json({ message: 'Finished' });
  } catch (error) {
    next(error);
  }
}

export async function updatedGoals(request: Request, response: Response, next: NextFunction) {
  try {
    const { id } = request.params;

    await MatchService.updateGoalsService(request.body, Number(id));

    return response.status(200).json({ message: 'Match is updated' });
  } catch (error) {
    next(error);
  }
}
