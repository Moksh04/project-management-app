import { gql } from '@apollo/client';

// NOTE: The ProjectStatus comes from the schema where the name of the GraphQlEnumType status is set to ProjectStatus
const ADD_PROJECT = gql`
  mutation addProject(
    $name: String!
    $description: String!
    $status: ProjectStatus!
    $clientId: ID!
  ) {
    addProject(
      name: $name
      description: $description
      status: $status
      clientId: $clientId
    ) {
      id
      name
      description
      status
      client {
        id
        name
        phone
        email
      }
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation updateProject(
    $name: String!
    $id: ID!
    $status: ProjectStatusUpdate!
    $description: String!
  ) {
    updateProject(
      name: $name
      id: $id
      status: $status
      description: $description
    ) {
      id
      name
      status
      description
    }
  }
`;

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };
