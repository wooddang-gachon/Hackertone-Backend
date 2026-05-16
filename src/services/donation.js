import donationRepo from "../repositories/donation.js";

export default {
  async createDonation(donation) {
    return await donationRepo.create(donation);
  },

  async getDonations() {
    return await donationRepo.findAll();
  },

  async getDonationDetail(didx) {
    return await donationRepo.findById(didx);
  }
};
