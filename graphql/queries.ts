import { gql } from "@apollo/client";

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

export const GET_USER_CREATED_RECIPES = gql`
  query getUserCreatedRecipes($id: String!) {
    getUserRecipes(id: $id) {
      title
    }
  }
`
