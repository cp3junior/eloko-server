import faker from 'faker';

import User from '../models/Users';

const USERS_TOTAL = 10;

export default async() => {
    try {
        await User.remove();

        await Array.from({ length: USERS_TOTAL }).forEach(async() => {
            await User.create({
                username: faker.internet.userName()
            });
        });
    } catch (error) {
        throw error;
    }
};