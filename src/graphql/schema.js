export default `
    type User {
        _id: String,
        username: String
    }

    type Query {
        getUsers: [User]
    }

    schema {
        query: Query
    }
`;
