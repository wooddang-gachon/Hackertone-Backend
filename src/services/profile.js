import userRepo from "../repositories/users.js";

export default {
  async getPoint(uidx) {
    const user = await userRepo.findById(uidx);
    return user ? user.point : null;
  },

  async getTags(uidx) {
    const user = await userRepo.findById(uidx);
    if (!user) return null;
    return {
      exercise: user.exercise,
      study: user.study,
      music: user.music,
      game: user.game,
      clean: user.clean
    };
  },

  async getUserInfo(uidx) {
    const user = await userRepo.findById(uidx);
    if (!user) return null;
    return {
      uidx: user.uidx,
      gachon_id: user.gachon_id,
      name: user.name,
      point: user.point,
      exercise: user.exercise,
      study: user.study,
      music: user.music,
      game: user.game,
      clean: user.clean
    };
  }
};
