import { Sqlclient, postgresclient } from "../client";
import chalk from "chalk";
import { checkStatus, ExitGeneric } from "../helpers";
import { ApolloError, DocumentNode } from "@apollo/client/core";

export const init = async (
  tablname: string,
  query: DocumentNode,
  mutation: DocumentNode
) => {
  checkStatus(tablname);
  get(null, query, mutation);

  //check that the postgres database table:aspnetusers is empty
};

function get(
  cursor: null | string,
  query: DocumentNode,
  mutation: DocumentNode
) {
  let has;
  let cursorr;
  let queryName = query.definitions[0].name.value;
  Sqlclient.query({
    query: query,
    variables: {
      first: 100,
      after: cursor,
    },
  })
    .then((value) => {
      if (value.data[queryName].edges.length) {
        has = value.data[queryName].pageInfo.hasNextPage;
        cursorr = value.data[queryName].pageInfo.endCursor;
        const results = value.data[queryName].edges;
        const mutationinput = results.map((item: any) => item.node);
        populatetable(mutationinput, has, cursorr, query, mutation);
      } else {
        console.log("reached end or empty source");
      }
      if (value.error) {
        value.errors?.map((e) => console.log(chalk.red.bold(e)));
        throw new ApolloError(value.error);
      }
    })
    .catch((e) => {
      console.log(e);
      ExitGeneric(
        `somthing is wrong getting excuting ${queryName} query please refer to sys admin`
      );
    });

  return;
}

function populatetable(
  mutationInput: any,
  has: boolean,
  cursorr: string,
  query: DocumentNode,
  mutation: DocumentNode
) {
  postgresclient
    .mutate({
      mutation: mutation,
      variables: { input: mutationInput },
    })
    .then((response) => {
      if (response.data) {
        console.log(response.data[mutation.definitions[0].name.value]);
      }
      if (response.errors?.length) {
        response.errors.map((e) => console.log(e.message));
      }
    })
    .catch((e) => {
      console.error(e);
      ExitGeneric(
        `somthing went wrong when trying to run${mutation.definitions[0].name.value}`
      );
    })
    .finally(() => {
      if (has) {
        get(cursorr, query, mutation);
      }
    });
}
