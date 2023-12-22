import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const clearForm = () => {
        setCurrentId(0);
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!postData.creator || !postData.title || !postData.message || !postData.tags) {
            alert('Please fill in all required fields.');
            return;
        }

        if (currentId === 0) {
            dispatch(createPost({ ...postData, name: user?.result?.name}));
            clearForm();
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clearForm();
        }
    };

    if (!user?.result?.name) {
        return (
            <Paper>
                <Typography variant="h6"> Please Sign In to create Missions</Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleFormSubmit}>
                <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Add Mission'}</Typography>
                <TextField
                    name="creator"
                    variant="outlined"
                    label="Mission Year"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                />
                <TextField
                    name="title"
                    variant="outlined"
                    label="Mission Name"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Mission Description"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Mission Team"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={(files) => setPostData({ ...postData, selectedFile: files.base64 })}
                    />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={clearForm}
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;
