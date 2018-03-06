import User from '../../models/Users';
import { requireAuth } from '../../services/auth';

export default {
    signup: async (_, { fullName, ...rest }) => {
        try {
            const [firstName, ...lastName] = fullName.split(' ');
            const user = await User.create({ firstName, lastName, ...rest });

            return {
                token: user.createToken(),
            };
        } catch (e) {
            throw e;
        }
    },
    login: async (_, { identification, password }) => {
        try {
            let user = await User.findOne({ email: identification });

            if (!user) {
                user = await User.findOne({ username: identification });
                if (!user) {
                    user = await User.findOne({ phone: identification });
                    if (!user) {
                        throw new Error('User does not exist');
                    }
                }
            }

            if (!user.authenticateUser(password)) {
                throw new Error('Wrong password');
            }

            return {
                token: user.createToken(),
            };
        } catch (e) {
            throw e;
        }
    },
    me: async (_, args, { user }) => {
        try {
            const me = await requireAuth(user);
            return me;
        } catch (e) {
            throw e;
        }
    },
};
