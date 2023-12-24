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
      likes
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
      likes
      creatorId
      creatorName
      creatorPhoto
    }
  }
`;

export const GET_USER_CREATED_RECIPES = gql`
  query getUserCreatedRecipes($id: String!) {
    getUserRecipes(id: $id) {
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

export const GET_RECIPE_COMMENTS = gql`
  query getRecipeComments($id: String!) {
    findRecipeCommentaries(id: $id) {
      id
      recipeId
      creatorId
      creatorPhoto
      creatorName
      content
      qtdLikes
      likes
      createdAt
    }
  }
`;

export const GET_USER_COMMENTS = gql`
  query getUserComments($id: String!) {
    findUserCommentaries(id: $id) {
      id
      recipeId
      creatorId
      creatorPhoto
      creatorName
      content
      qtdLikes
      likes
      createdAt
    }
  }
`;

export const GET_ALL_USERS = gql `
  query {
    users {
      id
      name
      firstname
      lastname
      email
      partner
      photo
      bio
    }
  }
`