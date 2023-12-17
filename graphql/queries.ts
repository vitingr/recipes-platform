import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $name: String!
    $firstname: String!
    $lastname: String!
    $email: String!
    $photo: String!
  ) {
    createNewUser(
      createUser: {
        name: $name
        firstname: $firstname
        lastname: $lastname
        email: $email
        photo: $photo
      }
    ) {
      name
      firstname
      lastname
      email
      photo
    }
  }
`;

export const GET_USER = gql`
  query getUser($email: String!) {
    getUser(email: $email) {
      id
      name
      firstname
      lastname
      email
      partner
      photo
      bio
      recipesCreated
      recipesLiked
      driverRecipeCreate
      driverProfile
    }
  }
`;

export const UPDATE_USER = gql`
  mutation ($id: String!) {
    updateUser(updateUser: { id: $id }) {
      partner
    }
  }
`;

export const UPDATE_BIO = gql`
  mutation ($id: String!, $bio: String!) {
    updateBio(updateBio: { id: $id, bio: $bio }) {
      bio
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation createRecipe(
    $title: String!
    $description: String!
    $ingredients: [String]
    $methods: [String]
    $creatorId: String!
    $type: String!
    $photo: String!
  ) {
    createRecipe(
      createRecipeInput: {
        title: $title
        description: $description
        ingredients: $ingredients
        methods: $methods
        creatorId: $creatorId
        type: $type
        photo: $photo
      }
    ) {
      title
      description
      ingredients
      methods
      creatorId
      type
      photo
    }
  }
`;
