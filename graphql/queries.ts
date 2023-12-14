import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation createUser($name: String!, $firstname: String!, $lastname: String!, $email: String!, $photo: String!) {
  createNewUser(createUser: {
    name: $name,
    firstname: $firstname,
    lastname: $lastname,
    email: $email,
    photo: $photo
  }) {
    name,
    firstname,
    lastname,
    email,
    photo
  }
}
`

export const GET_USER = gql`
query getUser($email: String!) {
  getUser(email: $email) {
    name,
    firstname,
    lastname,
    email,
    partner,
    photo,
    bio,
    recipesCreated,
    recipesLiked,
    driverRecipeCreate,
    driverProfile,
  }
}
`