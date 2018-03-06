export default `
    scalar Date
    
    type Status {
        message: String!
    }

    type Auth {
        token: String!
    }

    type User {
        _id: ID!
        username: String!
        firstName: String
        lastName: String
        email: String!
        phone: String!
        country: String
        avatar: String
        createdAt: Date!
        updatedAt: Date!
    }

    type Me {
        _id: ID!
        username: String!
        firstName: String
        lastName: String
        email: String!
        phone: String!
        country: String
        avatar: String
        createdAt: Date!
        updatedAt: Date!
    }

    type Post {
        _id: ID!
        text: String!
        user: User!
        likes: Int!
        createdAt: Date!
        updatedAt: Date!
    }

    type Query {
        me: Me
        getPosts: [Post]
        getPost(_id: ID!): Post
        getUserPosts: [Post]
    }
    
    type Mutation {
        signup(username: String!, fullName: String!, email: String!, phone: String!, country: String, avatar: String, password: String!): Auth
        login(identification: String!, password: String!): Auth
        createPost(text: String!): Post
        updatePost(_id: ID!, text: String): Post
        deletePost(_id: ID!): Status
    }
    
    schema {
        query: Query
        mutation: Mutation
    }
    `;
