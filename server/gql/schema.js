const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        id: ID
        name: String
        username: String
        email: String
        siteWeb: String
        description: String
        password: String
        avatar: String
        createAt: String
    }

    type Token {
        token: String
    }

    input UserInput {
        name: String!
        username: String!
        email: String!
        password: String!
    }

    input loginInput {
        email: String!
        password: String!
    }

    type Query {
        # User
        getUser: User
    }

    type Mutation {
        # User
        register(input: UserInput): User
        login(input: loginInput): Token
    }
`;

module.exports = typeDefs;