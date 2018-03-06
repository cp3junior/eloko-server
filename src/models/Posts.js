/* eslint-disable no-useless-escape*/
import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            minlength: [5, 'Text needs to be longer'],
            maxlength: [200, 'Text too long'],
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        likes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

export default mongoose.model('Post', postSchema);
