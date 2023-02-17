import { ILeaderboardTeam, IMatches, objectTeam } from '../interfaces/index';
import ITeams from '../interfaces/ITeams';

async function filterByHome(team: ITeams, matches: IMatches[]): Promise<ILeaderboardTeam> {
  const board = { ...objectTeam };
  matches.forEach((prop) => {
    if (team.id === prop.homeTeamId) {
      board.name = team.teamName;
      board.totalGames += 1;
      if (prop.homeTeamGoals > prop.awayTeamGoals) board.totalVictories += 1;
      if (prop.homeTeamGoals < prop.awayTeamGoals) board.totalLosses += 1;
      if (prop.homeTeamGoals === prop.awayTeamGoals) board.totalDraws += 1;
      board.totalPoints = board.totalVictories * 3 + board.totalDraws;
      board.goalsFavor += prop.homeTeamGoals;
      board.goalsOwn += prop.awayTeamGoals;
      board.goalsBalance = board.goalsFavor - board.goalsOwn;
      board.efficiency = ((board.totalPoints / (board.totalGames * 3)) * 100).toFixed(2);
    }
  });
  return board;
}

async function filterByAway(team: ITeams, matches: IMatches[]): Promise<ILeaderboardTeam> {
  const board = { ...objectTeam };
  matches.forEach((prop) => {
    if (team.id === prop.awayTeamId) {
      board.name = team.teamName;
      board.totalGames += 1;
      if (prop.awayTeamGoals > prop.homeTeamGoals) board.totalVictories += 1;
      if (prop.awayTeamGoals < prop.homeTeamGoals) board.totalLosses += 1;
      if (prop.awayTeamGoals === prop.homeTeamGoals) board.totalDraws += 1;
      board.totalPoints = board.totalVictories * 3 + board.totalDraws;
      board.goalsFavor += prop.awayTeamGoals;
      board.goalsOwn += prop.homeTeamGoals;
      board.goalsBalance = board.goalsFavor - board.goalsOwn;
      board.efficiency = ((board.totalPoints / (board.totalGames * 3)) * 100).toFixed(2);
    }
  });
  return board;
}

async function newATeamObj(team: string, arrHome: ILeaderboardTeam[], arrAway: ILeaderboardTeam[]) {
  const board = { ...objectTeam };
  arrAway.forEach((awayProp) => {
    board.name = team; if (board.name === awayProp.name) {
      board.totalGames = awayProp.totalGames; board.totalVictories = awayProp.totalVictories;
      board.totalLosses = awayProp.totalLosses; board.totalDraws = awayProp.totalDraws;
      board.goalsFavor = awayProp.goalsFavor; board.goalsOwn += awayProp.goalsOwn;
    }
  });
  arrHome.forEach((homeProp) => {
    if (board.name === homeProp.name) {
      board.totalGames += homeProp.totalGames; board.totalVictories += homeProp.totalVictories;
      board.totalLosses += homeProp.totalLosses; board.totalDraws += homeProp.totalDraws;
      board.goalsFavor += homeProp.goalsFavor; board.goalsOwn += homeProp.goalsOwn;
    }
    board.totalPoints = board.totalVictories * 3 + board.totalDraws;
    board.goalsBalance = board.goalsFavor - board.goalsOwn;
    board.efficiency = ((board.totalPoints / (board.totalGames * 3)) * 100).toFixed(2);
  }); return board;
}

async function sortingTheBoard(arrayTeamBoard: ILeaderboardTeam[]): Promise<ILeaderboardTeam[]> {
  return arrayTeamBoard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
}

export {
  newATeamObj,
  filterByAway,
  filterByHome,
  sortingTheBoard,
};
