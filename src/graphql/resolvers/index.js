import userResolvers from './user-resolvers';

export default {
    Query: {
        getUsers: userResolvers.getUsers,
    },
};
