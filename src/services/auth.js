import jwt from 'jsonwebtoken';

import constants from '../config/constants';
import User from '../models/Users';

export async function requireAuth(user) {
    if (!user || !user._id) {
        throw new Error('Unauthorized user, must be logged in');
    }

    const me = await User.findById(user._id);

    if (!me) {
        throw new Error('Unauthorized user, must be logged in');
    }

    return me;
}

export function decodeToken(token) {
    const arr = token.split(' ');
    if (arr[0] === 'Bearer') {
        return jwt.verify(arr[1], constants.JWT_SECRET);
    }
    throw new Error('Token not valid');
}
