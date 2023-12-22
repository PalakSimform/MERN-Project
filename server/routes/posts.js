import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import sign from '../middleware/sign.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', sign, createPost);
router.patch('/:id', sign, updatePost);
router.delete('/:id', sign, deletePost);
router.patch('/:id/likePost', sign, likePost)

router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

export default router;