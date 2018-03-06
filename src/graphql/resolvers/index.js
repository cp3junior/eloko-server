import GraphQLDate from 'graphql-date';

import userResolvers from './user-resolvers';
import postResolvers from './post-resolvers';
import User from '../../models/Users';

export default {
    Date: GraphQLDate,
    Post: {
        user: ({ user }) => User.findById(user),
    },
    Query: {
        me: userResolvers.me,
        getPosts: postResolvers.getPosts,
        getPost: postResolvers.getPost,
        getUserPosts: postResolvers.getUserPosts,
    },
    Mutation: {
        signup: userResolvers.signup,
        login: userResolvers.login,
        createPost: postResolvers.createPost,
        updatePost: postResolvers.updatePost,
        deletePost: postResolvers.deletePost,
    },
};
