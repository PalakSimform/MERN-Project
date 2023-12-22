import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

const handleResponse = (res, status, message) => {
    return res.status(status).json({ message });
};

const validateObjectId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return handleResponse(res, 400, 'Invalid ObjectId');
    }
    next();
};

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        handleResponse(res, 400, error.message);
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        handleResponse(res, 409, error.message);
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
  
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send(`Invalid ID: ${id}`);
      }
  
      const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
      const updatedPostResult = await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
  
      if (!updatedPostResult) {
        return res.status(404).send(`No post with id: ${id}`);
      }
  
      res.json(updatedPostResult);
    } catch (error) {
      console.error('Error updating post:', error);
      handleResponse(res, 500, 'Server error while updating post');
    }
  };
  

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    try {
        validateObjectId(req, res, async () => {
            await PostMessage.findByIdAndDelete(_id);
            res.json({ message: 'Post deleted successfully' });
        });
    } catch (error) {
        handleResponse(res, 500, 'Server error while deleting post');
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    try {
        if (!req.userId) return res.json({ message: "Unauthorized" });
        validateObjectId(req, res, async () => {
            const post = await PostMessage.findById(id);
            if (!post) {
                return handleResponse(res, 404, 'Post not found');
            }

            const index = post.likes.findIndex((id) => id === String(req.userId));

            if (index === -1) {
                //for liking
                post.likes.push(req.userId);
            }
            else {
                //dislike
                post.likes = post.likes.filter((id) => id !== String(req.userId))
            }
            const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
            res.json(updatedPost);
        });
    } catch (error) {
        handleResponse(res, 500, 'Server error while updating post');
    }
}
