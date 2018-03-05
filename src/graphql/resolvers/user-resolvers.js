import User from '../../models/Users';

export default {
    getUsers: () => User.find({}),
};
