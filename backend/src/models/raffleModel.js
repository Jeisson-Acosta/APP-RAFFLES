import { manageDB } from "../../utils/manageDB.js"

export class RaffleModel {
  static async getInitialInfo() {
    const responseDB = await manageDB("sp_get_initial_info", []);
    return responseDB;
  }

  static async saveNumberUser({ data }) {
    const { cavnum, cavnomusu, cavcel, cavemail, cavestado } = data
    const responseDB = await manageDB("sp_save_number_seller", [cavnum, cavnomusu, cavcel, cavemail, cavestado]);
    return responseDB;
  }
}
