import Post from '../../models/Posts';
import { requireAuth } from '../../services/auth';

export default {
    getPosts: async (_, args, { user }) => {
        try {
            await requireAuth(user);
            return Post.find({}).sort({ createdAt: -1 });
        } catch (e) {
            throw e;
        }
    },
    getPost: async (_, { _id }, { user }) => {
        try {
            await requireAuth(user);
            return Post.findById(_id);
        } catch (e) {
            throw e;
        }
    },
    getUserPosts: async (_, args, { user }) => {
        try {
            await requireAuth(user);
            return Post.find({
                user: user._id,
            }).sort({ createdAt: -1 });
        } catch (e) {
            throw e;
        }
    },
    createPost: async (_, args, { user }) => {
        try {
            await requireAuth(user);
            return Post.create({ ...args, user: user._id });
        } catch (e) {
            throw e;
        }
    },
    updatePost: async (_, { _id, ...rest }, { user }) => {
        try {
            await requireAuth(user);
            const post = await Post.findOne({ _id, user: user._id });
            if (!post) {
                throw new Error('Post not found');
            }
            Object.entries(rest).forEach(([key, value]) => {
                post[key] = value;
            });
            return post.save();
        } catch (e) {
            throw e;
        }
    },
    deletePost: async (_, { _id }, { user }) => {
        try {
            await requireAuth(user);
            const post = await Post.findOne({ _id, user: user._id });
            if (!post) {
                throw new Error('Post not found');
            }
            await post.remove();
            return {
                message: 'Delete successful!',
            };
        } catch (e) {
            throw e;
        }
    },
};
