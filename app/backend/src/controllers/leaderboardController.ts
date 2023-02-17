import { Request, Response, NextFunction } from 'express';
import {
  getAllLeaderboardAwayService,
  getAllLeaderboardHomeService,
  getAllLeaderboardService,
} from '../services/leaderboardService';

export async function getAllHome(_request: Request, response: Response, next: NextFunction) {
  try {
    const getAllresultHome = await getAllLeaderboardHomeService();

    return response.status(200).json(getAllresultHome);
  } catch (error) {
    next(error);
  }
}

export async function getAllAway(_req: Request, response: Response, next: NextFunction) {
  try {
    const getAllresultAway = await getAllLeaderboardAwayService();

    return response.status(200).json(getAllresultAway);
  } catch (error) {
    next(error);
  }
}

export async function getAll(_req: Request, response: Response, next: NextFunction) {
  try {
    const getAllresultBoard = await getAllLeaderboardService();

    return response.status(200).json(getAllresultBoard);
  } catch (error) {
    next(error);
  }
}
