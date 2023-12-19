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

export const GET_ALL_RECIPES = gql`
  query getAllRecipes {
    recipes {
      id
      title
      ingredients
      methods
      photo
      qtdLikes
      creatorId
    }
  }
`;

export const GET_RECIPE_DATA = gql`
  query getRecipeData($id: String!) {
    recipe(id: $id) {
      id
      title
      ingredients
      methods
      photo
      qtdLikes
      creatorId
      creatorName
      creatorPhoto
    }
  }
`;
