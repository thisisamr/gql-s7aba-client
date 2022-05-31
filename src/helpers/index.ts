import chalk from "chalk";
import { GetNumberOfRecords, tableIsEmpty } from "../graphql/queries/queries";
import { postgresclient } from "../client";
import { Stat } from "../types";
import { ApolloError } from "@apollo/client/core";
import { unsafe } from "../graphql/mutations/mutations";
export async function getDbStats() {
  console.log(chalk.bgBlue.green(`Edge-Pro For information Systems`));
  console.log(chalk.yellowBright("Current records in: rsc_v2"));
  let arr: Stat[] = [];
  try {
    const res = await postgresclient.query({ query: GetNumberOfRecords });
    res.data.GetNumberOfRecords.forEach((element: Stat) => {
      arr.push(element);
    });
    console.table(
      [
        {
          Addresses: arr[0].count,
          aspnetusers: arr[1].count,
          userprofiles: arr[2].count,
          requests: arr[3].count,
          shippingorders: arr[4].count,
          paymenttrasnsactions: arr[5].count,
        },
      ],
      [
        "Addresses",
        "aspnetusers",
        "userprofiles",
        "requests",
        "shippingorders",
        "paymenttrasnsactions",
      ]
    );
  } catch (error) {
    console.log(error);
  }
}
export function checkStatus(tablname: string) {
  console.log(`checking ${tablname} state 🔍`);
  postgresclient
    .query({
      query: tableIsEmpty,
      variables: { input: tablname },
    })
    .then((response) => {
      if (response.data) {
        console.log(
          "\x1b[35m%s\x1b[0m",
          `Table ${tablname} is empty:❓${
            response.data.TableIsEmpty ? "✔️" : "❌"
          }`,
          response.data.TableIsEmpty
        );
        if (response.data.TableIsEmpty == false) Exit();
      }
      if (response.error) {
        console.log(response.error.message);
        Exit();
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

export function Exit() {
  console.log("\x1b[31m%s\x1b[0m", "\nMake Sure Target Is Empty");
  process.exit(1);
}

export function ExitGeneric(msg: string) {
  console.log("\x1b[31m%s\x1b[0m", "\nSomthing went wrong\n" + msg);
  process.exit(1);
}

export async function TruncateAllTables() {
  return new Promise((resolve, reject) => {
    postgresclient
      .mutate({
        mutation: unsafe,
      })
      .then(({ data, errors }) => {
        if (data) {
          chalk.bgGreen(console.log(data));
          resolve(data);
        }
        if (errors) {
          errors.map((e) => console.log(e));
          throw new ApolloError({
            errorMessage: "somthing went wrong could not clear db successfully",
          });
          reject(errors);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}
