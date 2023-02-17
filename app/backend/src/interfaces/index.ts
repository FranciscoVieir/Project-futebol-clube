export interface ILogin {
  email: string,
  password: string
}

export interface IJwtToken {
  token: string;
}

export interface IUserLogin {
  id: number,
  username: string;
  role: string;
  email: string;
  password: string;
}
export interface IMatches {
  id: number;
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IinProgress {
  inProgress: string
}
export interface ISimpleMatches {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface ILeaderboardTeam {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string
}

export const objectTeam: ILeaderboardTeam = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '',
};
