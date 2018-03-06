/* eslint-disable no-useless-escape*/
import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { hashSync, genSaltSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import constants from '../config/constants';

const salt = genSaltSync(10);
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: true,
        },
        firstName: String,
        lastName: String,
        email: {
            type: String,
            unique: true,
            trim: true,
            required: true,
            validate: {
                validator(email) {
                    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
                    return regExp.test(email);
                },
                message: '{VALUE} is not a valid email',
            },
        },
        phone: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        country: String,
        password: {
            type: String,
            trim: true,
            required: true,
        },
        avatar: String,
    },
    { timestamps: true },
);

userSchema.methods = {
    _hashPassword(password) {
        return hashSync(password, salt);
    },
    authenticateUser(password) {
        return compareSync(password, this.password);
    },
    createToken() {
        return jwt.sign(
            {
                _id: this._id,
            },
            constants.JWT_SECRET,
        );
    },
};

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
        return next();
    }
    return next();
});

userSchema.plugin(uniqueValidator, {
    message: '{VALUE} already exists',
});

export default mongoose.model('User', userSchema);
