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
