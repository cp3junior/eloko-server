import faker from 'faker';

import User from '../models/Users';

const USERS_TOTAL = 10;

export default async () => {
    try {
        await User.remove();

        await Array.from({ length: USERS_TOTAL }).forEach(async () => {
            await User.create({
                username: faker.internet.userName(),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                phone: faker.phone.phoneNumber(),
                country: faker.address.country(),
                password: faker.random.word(),
                avatar: faker.random.image(),
            });
        });
    } catch (error) {
        throw error;
    }
};
