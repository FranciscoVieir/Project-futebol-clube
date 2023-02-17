import updateToFinished from '../models/createLeaderBoard';
import { getAll } from './teamService';
import { newATeamObj, filterByAway, filterByHome, sortingTheBoard } from '../models/modelLeader';

export async function getAllLeaderboardHomeService() {
  const getAllTeams = await getAll();
  const matchesFinished = await updateToFinished();

  if (getAllTeams && matchesFinished) {
    const respo = await Promise.all(getAllTeams.map((team) => filterByHome(team, matchesFinished)));
    return sortingTheBoard(respo);
  }
}

export async function getAllLeaderboardAwayService() {
  const getAllTeams = await getAll();
  const matchesFinished = await updateToFinished();

  if (getAllTeams && matchesFinished) {
    const respo = await Promise.all(getAllTeams.map((team) => filterByAway(team, matchesFinished)));
    return sortingTheBoard(respo);
  }
}

export async function getAllLeaderboardService() {
  const getAllHomeBoard = await getAllLeaderboardHomeService();
  const getAllAwayBoard = await getAllLeaderboardAwayService();

  const getAllTeams = await getAll();

  if (getAllHomeBoard && getAllAwayBoard && getAllTeams) {
    const response = await Promise.all(getAllTeams
      .map((team) => newATeamObj(team.teamName, getAllHomeBoard, getAllAwayBoard)));
    return sortingTheBoard(response);
  }
}
