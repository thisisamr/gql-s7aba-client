import { init } from "./services/init";
import { getDbStats, TruncateAllTables } from "./helpers/index";
import { stdin as input, stdout as output } from "node:process";
import * as readline from "readline";
const rl = readline.createInterface({ input, output });
import {
  addressesQuery,
  paymenttrasnsactionsQuery,
  requestsQuery,
  shippingordersQuery,
  userprofilesQuery,
  usersQuery,
} from "./graphql/queries/queries";
import {
  poulateTableAddresses,
  poulateTablePaymenttrasnsactions,
  poulateTableRequests,
  poulateTableShippingorders,
  poulateTableUserprofiles,
  poulateTableUsers,
} from "./graphql/mutations/mutations";

export async function main(args?: string[]) {
  console.log(process.env.apiKey);
  await getDbStats();
  if (args) {
    console.log(args);
  }
  rl.question("proceed with the sync ? [y/n]", (input) => {
    input.toString().trim().toLocaleLowerCase() == "y"
      ? Sync()
      : process.exit();
  });
  async function Sync() {
    await TruncateAllTables();
    init("aspnetusers", usersQuery, poulateTableUsers);
    init("requests", requestsQuery, poulateTableRequests);
    init("addresses", addressesQuery, poulateTableAddresses);
    init("userprofiles", userprofilesQuery, poulateTableUserprofiles);
    init(
      "paymenttrasnsactions",
      paymenttrasnsactionsQuery,
      poulateTablePaymenttrasnsactions
    );
    init("shippingorders", shippingordersQuery, poulateTableShippingorders);

    rl.close();
  }
}
