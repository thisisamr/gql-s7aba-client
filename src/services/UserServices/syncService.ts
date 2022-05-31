// import { Sqlclient, postgresclient } from "../../client";
// import { poulateTableUsers } from "../../graphql/mutations/mutations";
// import EventEmitter from "events";
// import {
//   usersQuery,
//   tableIsEmpty,
//   countRecords,
//   latestUserQuery,
//   newUsersQuery,
// } from "../../graphql/queries/queries";

// export const syncUserTable = () => {
//   //get the created date of the last element
//   const d = GetlatestdtRecord("aspnetusers");
//   d.then((d) => {
//     console.log(d.data);
//     if (d.data.getlatestUser.length) {
//       getNewUsers(
//         null,
//         new Date(d.data.getlatestUser[0].addeddate),
//         d.data.getlatestUser[0].id
//       );
//     } else {
//       console.log(`Table Aspnetusers is empty check postgres😁`);
//     }
//   }).catch((e) => console.log(e));
// };

// function GetlatestdtRecord(tablname: string) {
//   console.log(`getting the latest record in table : ${tablname} 🚙🚙`);
//   const asd = postgresclient.query({ query: latestUserQuery });
//   return asd;
// }
// function Exit() {
//   console.log("\x1b[31m%s\x1b[0m", "\nmake sure that targettable is empty");
//   process.exit(1);
// }

// function ExitGeneric(msg: string) {
//   console.log("\x1b[31m%s\x1b[0m", "\nSomthing went wrong\n" + msg);
//   process.exit(1);
// }

// function getNewUsers(cursor: null | string, afterDate: Date, id: string) {
//   let has;
//   let cursorr;
//   Sqlclient.query({
//     query: newUsersQuery,
//     variables: {
//       first: 20,
//       after: cursor,
//       afterDate: afterDate,
//       id,
//     },
//   })
//     .then((value) => {
//       //console.log(value.data.newUsersQuery.edges);
//       if (value.data.newUsersQuery.edges.length) {
//         has = value.data.newUsersQuery.pageInfo.hasNextPage;
//         cursorr = value.data.newUsersQuery.pageInfo.endCursor;
//         const users = value.data.newUsersQuery.edges;
//         const mutationinput = users.map((user: any) => user.node);
//         populatetable(mutationinput, has, cursorr, afterDate, id);
//         console.log(mutationinput.length);
//       } else {
//         console.log("no new records 🙅‍♂️ in SQLSERVER AspNetUsers");
//       }
//       if (value.error) {
//         console.log(value.error);
//         ExitGeneric("somthing went wrong trying to get newusers");
//       }
//     })
//     .catch((e) => console.log(e));

//   return;
// }

// function populatetable(
//   mutationInput: any,
//   has: boolean,
//   cursorr: string,
//   afterDate: Date,
//   id: string
// ) {
//   postgresclient
//     .mutate({
//       mutation: poulateTableUsers,
//       variables: { input: mutationInput },
//     })
//     .then((response) => {
//       if (response.data) {
//         console.log(
//           "\x1b[34m%s\x1b[0m",
//           "🚀",
//           response.data.initUsers + "⚡⚡⚡....✔️"
//         );
//       }
//       if (response.errors) {
//         response.errors.map((e) => console.log(e.message));
//         ExitGeneric("error trying to populate table aspnetusers");
//       }
//     })
//     .catch((e) => console.error(e))
//     .finally(() => {
//       if (has) {
//         getNewUsers(cursorr, afterDate, id);
//       }
//     });
// }
