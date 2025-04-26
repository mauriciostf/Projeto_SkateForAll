import { AppDataSource } from "../dataSource";
import { Donation } from "../models/Donation";
import { User } from "../models/User";

export class DonationRepository {
  private donationRepository = AppDataSource.getRepository(Donation);

  async createDonation(donorId: number, recipientId: number, item: string, description: string, imageUrl?: string) {
    const donor = await AppDataSource.getRepository(User).findOneBy({ id: donorId });
    const recipient = await AppDataSource.getRepository(User).findOneBy({ id: recipientId });

    if (!donor || !recipient) return null;

    const donation = new Donation(donor, recipient, item, description);
    donation.imageUrl = imageUrl;

    return await this.donationRepository.save(donation);
  }
  async findAllDonations() {
    return await this.donationRepository.find({
      relations: ["donor", "recipient"]
    });
  }

  async findDonationById(id: number) {
    return await this.donationRepository.findOne({
      where: { id },
      relations: ["donor", "recipient"]
    });
  }


  async updateDonation(id: number, fieldsToUpdate: Partial<Donation>) {
    const donation = await this.findDonationById(id);
    if (!donation) return null;

    Object.assign(donation, fieldsToUpdate);
    return await this.donationRepository.save(donation);
  }

  async deleteDonation(id: number) {
    const donation = await this.findDonationById(id);
    if (!donation) return null;
    return await this.donationRepository.remove(donation);
  }

  async findDonationsMadeByUser(userId: number) {
    return await this.donationRepository.find({
      where: { donor: { id: userId } },
      relations: ["recipient"]
    });
  }

  async findDonationsReceivedByUser(userId: number) {
    return await this.donationRepository.find({
      where: { recipient: { id: userId } },
      relations: ["donor"]
    });
  }
}
