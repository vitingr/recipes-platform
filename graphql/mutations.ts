import { gql } from "@apollo/client";

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
