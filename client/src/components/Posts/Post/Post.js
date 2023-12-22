import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { likePost, deletePost } from '../../../actions/posts';

import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))
    const [isDeleting, setIsDeleting] = useState(false);

    const handleLikeClick = () => {
        dispatch(likePost(post._id));
    };


    const handleDeleteClick = () => {
        setIsDeleting(true);
        dispatch(deletePost(post._id));
    };

    if (isDeleting) {
        return null;
    }

    const Likes = () => {
        if (!post.likes) {
            return null;
        }

        const likedByUser = post.likes.find((like) => like === (user?.result?._id));

        if (post.likes.length > 0) {
            return likedByUser ? (
                <>
                    <ThumbUpAltIcon fontSize="small" />
                    Like &nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
                </>
            ) : (
                <>
                    <ThumbUpAltIcon fontSize="small" />
                    Like &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
                </>
            );
        }

        return null;
    };


    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="small" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">
                    {post.tags.join(', ')}
                </Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom component="h2">
                {post.title}
            </Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                <Button size="small" color="primary" onClick={handleDeleteClick}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default Post;
