import { gql } from "@apollo/client/core";

export const usersQuery = gql`
  query usersQuery($first: Int!, $after: String) {
    usersQuery(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          arabicfullname
          addeddate
          modifieddate
          makerid
          dateofbirth
          makerid
          firstlogin
          addressid
          username
          normalizedusername
          email
          normalizedemail
          emailconfirmed
          passwordhash
          securitystamp
          concurrencystamp
          phonenumber
          phonenumberconfirmed
          twofactorenabled
          lockoutendl
          lockoutenabled
          accessfailedcount
          sync_status
        }
      }
    }
  }
`;
// export const newUsersQuery = gql`
//   query newUsersQuery($first: Int!, $after: String, $afterDate: Date!) {
//     newUsersQuery(first: $first, after: $after, afterDate: $afterDate) {
//       pageInfo {
//         endCursor
//         hasNextPage
//       }
//       edges {
//         cursor
//         node {
//           id
//           arabicfullname
//           addeddate
//           modifieddate
//           makerid
//           dateofbirth
//           makerid
//           firstlogin
//           addressid
//           username
//           normalizedusername
//           email
//           normalizedemail
//           emailconfirmed
//           passwordhash
//           securitystamp
//           concurrencystamp
//           phonenumber
//           phonenumberconfirmed
//           twofactorenabled
//           lockoutendl
//           lockoutenabled
//           accessfailedcount
//           sync_status
//         }
//       }
//     }
//   }
// `;
// export const newRequestsQuery = gql`
//   query getNewRequests(
//     $first: Int!
//     $after: Int
//     $afterDate: Date!
//     $id: Int!
//   ) {
//     newRequestsQuery(
//       first: $first
//       after: $after
//       afterDate: $afterDate
//       id: $id
//     ) {
//       pageInfo {
//         endCursor
//         hasNextPage
//       }
//       edges {
//         cursor
//         node {
//           unittype
//           requeststatus
//           area
//           price
//           requestnumber
//           userid
//           addeddate
//           modifieddate
//           createdby
//           id
//           updatedby
//         }
//       }
//     }
//   }
// `;
export const tableIsEmpty = gql`
  query tableIsempty($input: DbTables!) {
    TableIsEmpty(tablename: $input)
  }
`;
// export const countRecords = gql`
//   query countRecords($input: DbTables!) {
//     GetNumberOfRecords(tablename: $input)
//   }
// `;
export const requestsQuery = gql`
  query requestsQuery($first: Int!, $after: Int) {
    requestsQuery(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          unittype
          requeststatus
          area
          price
          requestnumber
          userid
          addeddate
          modifieddate
          createdby
          id
        }
      }
    }
  }
`;
// export const latestUserQuery = gql`
//   query getlatestUserAdded {
//     getlatestUser {
//       id
//       addeddate
//     }
//   }
// `;
// export const latestRequestsQuery = gql`
//   query getlatestRequests {
//     getLatestRequest {
//       addeddate
//       id
//     }
//   }
// `;
export const GetNumberOfRecords = gql`
  {
    GetNumberOfRecords {
      tablename
      count
    }
  }
`;
export const addressesQuery = gql`
  query addressesQuery($first: Int!, $after: Int) {
    addressesQuery(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          description
          districtid
          property_number
          floor_number
          apartment_number
          streetname
          unique_mark
          requestid
          addeddate
          modifieddate
          createdby
          updatedby
          regionid
          sync_status
        }
      }
    }
  }
`;
