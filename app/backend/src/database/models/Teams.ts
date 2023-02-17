import { Model, DataTypes } from 'sequelize';
import db from '.';
import Match from './Matches';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Team.hasMany(Match, { foreignKey: 'homeTeamId', as: 'homeMatchs' });
Team.hasMany(Match, { foreignKey: 'awayTeamId', as: 'awayMatchs' });

export default Team;
