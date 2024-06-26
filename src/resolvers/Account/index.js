import _ from "lodash";
import getCurrencyDefinitionByCode from "@reactioncommerce/api-utils/getCurrencyDefinitionByCode.js";
import { encodeAccountOpaqueId } from "../../xforms/id.js";
import addressBook from "./addressBook.js";
import adminUIShops from "./adminUIShops.js";
import groups from "./groups.js";

const permissions = [
  "manageUsers",
  "manageProperties",
  "manageReports",
  "manageRates",
  "managePermissions",
  "manageFunds",
];

export default {
  _id: (account) => encodeAccountOpaqueId(account._id),
  addressBook,
  adminUIShops,
  bio: (account) => account.profile.bio,
  currency: (account) =>
    getCurrencyDefinitionByCode(account.profile && account.profile.currency),
  emailRecords: (account) => account.emails,
  firstName: (account) => account.profile.firstName,
  groups,
  contactInfo: (account) => account.contactInfo,
  nextKin: (account) => account.nextKin,
  lastName: (account) => account.profile.lastName,
  suspend: (account) => account.profile.suspend,
  transactionId: (account) => account.profile.transactionId,
  phone: (account) => account.profile.phone,
  wallet: (account) => account.wallets ?? 0,
  accountPermissions: (account) => account.accountPermissions,
  govId: (account) => account.govId ?? [],
  userBanksDetail: (account) => account.userBanksDetail ?? [],
  userPreferences: (account) => account.userPreferences ?? {},
  poAddress: (account) => account.poAddress ?? "null",
  dob: (account) => account.profile.dob,
  language: (account) => account.profile.language,
  name: (account) => account.profile.name || account.name,
  picture: (account) => account.profile.picture,
  preferences: (account) => _.get(account, "profile.preferences"),
  primaryEmailAddress: (account) => {
    const primaryRecord = (account.emails || []).find(
      (record) => record.provides === "default"
    );
    return (primaryRecord && primaryRecord.address) || "";
  },
  Product: { _id: "testID" },
  username: (account) => account.profile.username || account.username,
  isAdmin: (account) => {
    if (
      account?.accountPermissions &&
      permissions.some(
        (permission) => account?.accountPermissions[permission]?.length || 0
      )
    ) {
      return true;
    } else {
      return false;
    }
  },
};
