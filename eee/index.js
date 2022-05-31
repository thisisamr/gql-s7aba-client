import { v4 } from "uuid";
import fs from "fs";
import fetch from "node-fetch";
function add() {
  let arr = [];
  for (let index = 0; index < 100; index++) {
    arr.push({
      Id: v4(),
      ArabicFullName: `a7a${index}`,
      AddedDate: "2022-05-25T06:08:12.000Z",
      ModifiedDate: null,
      MakerId: null,
      DateOfBirth: "0001-01-01T00:00:00.000Z",
      FirstLogIn: false,
      AddressId: null,
      UserName: "as_ABOUTIG",
      NormalizedUserName: "AS_ABOUTIG",
      Email: null,
      NormalizedEmail: null,
      EmailConfirmed: true,
      PasswordHash:
        "AQAAAAEAACcQAAAAEGNDo3ODfHAFwXxh8kG1Pe9e3iNe3ecf7pmQJyUEScMzpGDkFrjpliaIdfzGUsyOew==",
      SecurityStamp: "G4BLQ5YNYGL27S226NXJD6EINTGCRUQD",
      ConcurrencyStamp: "9df4a54c-715f-40ad-94a6-c09d0a6ac5e1",
      PhoneNumber: null,
      PhoneNumberConfirmed: false,
      TwoFactorEnabled: false,
      LockoutEnd: null,
      LockoutEnabled: true,
      AccessFailedCount: 0,
      SyncStatus: 0,
    });
  }
  fetch("http://localhost:4001/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `mutation addDummies($inputs:[Dummy]) {
                addDummyUserData(inputs:$inputs)
            }
            `,
      variables: {
        inputs: [...arr],
      },
    }),
  })
    .then((d) => {
      d.json((d) => console.log(d));
      console.log("hi");
    })
    .catch((e) => console.log(e));
}
// add();
// add();
// add();
// add();
// add();
// add();
// add();
// add();
// add();
// add();
function addRequests() {
  let arrReq = [];
  for (let index = 0; index < 100; index++) {
    arrReq.push({
      UnitType: 1,
      RequestStatus: 0,
      Area: 2.0e2,
      Price: 2.7e3,
      RequestNumber: "13-1322-1-00000003310",
      UserId: v4(),
      AddedDate: new Date("2022-05-25T16:58:33.6825742"),
      Createdby: `a7a${index}`,
      HasPriceDifference: false,
      IsPaid: false,
      IsArchived: false,
    });
  }
  fetch("http://localhost:4001/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `mutation add($inputs:[DummyReq]) {
            addDummyRequestsData(inputs:$inputs)
              }`,
      variables: {
        inputs: [...arrReq],
      },
    }),
  })
    .then((d) => {
      d.json((d) => console.log(d));
      console.log("heloo");
    })
    .catch((e) => console.log(e));
  //   fetch("http://localhost:4001/graphql", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: '{"query":"mutation add($input:[DummyReq!]!){\\n\\taddDummyRequestsData(inputs:$input)\\n}","variables":{"input":[{"Id":5000,"UnitType":1,"RequestStatus":0,"Area":200,"Price":2700,"RequestNumber":"13-1322-1-00000003310","UserId":"19aaf2da-ea78-4058-a393-cf06f841253e","AddedDate":"2022-05-18T16:58:33.6825742","Createdby":"ahmedabr","HasPriceDifference":false,"IsPaid":false,"IsArchived":false}]},"operationName":"add"}',
  //   })
  //     .then((response) => {
  //       response.json((d) => {
  //         console.log(d);
  //       });
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
}
addRequests();
