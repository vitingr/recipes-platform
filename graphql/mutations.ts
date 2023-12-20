import { gql } from "@apollo/client";

export const CREATE_RECIPE = gql`
  mutation (
    $title: String!
    $description: String!
    $ingredients: [String!]!
    $methods: [String!]!
    $creatorId: String!
    $creatorPhoto: String!
    $creatorName: String!
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
        creatorPhoto: $creatorPhoto
        creatorName: $creatorName
        type: $type
        photo: $photo
      }
    ) {
      title
      description
      ingredients
      methods
      creatorId
      creatorPhoto
      creatorName
      type
      photo
    }
  }
`;

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

export const CREATE_COMMENT = gql`
  mutation (
    $recipeId: String!
    $creatorId: String!
    $creatorPhoto: String!
    $creatorName: String!
    $content: String!
  ) {
    createComment(
      createCommentInput: {
        recipeId: $recipeId
        creatorId: $creatorId
        creatorPhoto: $creatorPhoto
        creatorName: $creatorName
        content: $content
      }
    ) {
      recipeId
    }
  }
`;
