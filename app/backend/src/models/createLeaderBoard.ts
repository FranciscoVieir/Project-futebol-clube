import { IMatches } from '../interfaces/index';
import MatchesModel from '../database/models/Matches';

const updateToFinished = async (): Promise<IMatches[]> => {
  const updateFinished = await MatchesModel.findAll({
    where: { inProgress: false },
  });
  return updateFinished;
};

export default updateToFinished;
