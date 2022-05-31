import { init } from "./services/init";
import { getDbStats, TruncateAllTables } from "./helpers/index";
import { stdin as input, stdout as output } from "node:process";
import * as readline from "readline";
const rl = readline.createInterface({ input, output });
import {
  addressesQuery,
  requestsQuery,
  usersQuery,
} from "./graphql/queries/queries";
import {
  poulateTableAddresses,
  poulateTableRequests,
  poulateTableUsers,
} from "./graphql/mutations/mutations";

export async function main(args?: string[]) {
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
    // init('aspnetuserprofile',usersQuery)
    // init('paymenttrasnsactionshippingorder',usersQuery)
    // init('paymenttrasnsactionrequestpricedifference',usersQuery)
    rl.close();
  }
}
