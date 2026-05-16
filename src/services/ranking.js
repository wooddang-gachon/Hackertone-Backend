import rankingRepo from "../repositories/ranking.js";
import userRepo from "../repositories/users.js";

const VALID_CATEGORIES = ["point", "exercise", "study", "music", "game", "clean"];

export default {
  async getRankings(category, uidx, limit = 10) {
    if (!VALID_CATEGORIES.includes(category)) {
      throw new Error("INVALID_CATEGORY");
    }

    const rankList = await rankingRepo.getTopRankings(category, limit);
    
    let myRank = null;
    if (uidx) {
      const user = await userRepo.findById(uidx);
      if (user) {
        const userRankData = await rankingRepo.getUserRank(uidx, category);
        myRank = {
          rank: userRankData.rank,
          nickname: user.name,
          score: userRankData.score
        };
      }
    }

    return { rankList, myRank };
  }
};
