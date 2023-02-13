import TeamModel from '../database/models/Teams';

export async function getAll() {
  const allTeams = await TeamModel.findAll();
  return allTeams;
}

export async function getById(id: number) {
  const teanById = await TeamModel.findByPk(id);
  return teanById;
}
