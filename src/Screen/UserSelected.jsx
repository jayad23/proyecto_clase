import React, { useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { endpoint } from "./Home";
import { useFetch } from "../hooks/useFetch";
import { Box, Button, CardMedia, IconButton, TextareaAutosize, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import { v4 } from "uuid";

const colorCollection = {
    0: "#FA9884",
    1: "#C0DBEA",
    2: "#FFA559",
    3: "#F3E8FF"
}

const UserSelected = () => {
    const { login } = useParams();
    const [data] = useFetch(`${endpoint}/${login}`);
    const [comments, setComments] = useState({ showCommentBubble: false, comment: "", collection: [] });
    const [edit, setEdit] = useState({ flag: false, id: null });

    const handleShowCommentBubble = () => {
        setComments({ ...comments, showCommentBubble: true });
    };

    const handleComment = (value) => {
        setComments({ ...comments, comment: value });
    };

    const handleSubmitComment = () => {
        setComments({ ...comments, collection: [{ id: v4(), bg: colorCollection[Math.floor(Math.random() * 4)], value: comments.comment }, ...comments.collection], comment: "" })
    };

    const handleEdit = (id) => {
        setEdit({ flag: true, id });
        const selected = comments.collection.find(com => com.id === id);
        setComments({ ...comments, comment: selected.value })
    };

    const handleSubmitEdittedComment = (id) => {
        const updatedCollection = comments.collection.map(com => com.id === id ? { ...com, value: comments.comment } : com);
        setComments({ ...comments, collection: updatedCollection, comment: "" })
    };

    return (
        <Fragment>
            {
                data && (
                    <Box component="div"
                        sx={{
                            width: "fit-content",
                            border: "1px solid grey",
                            p: 2,
                            borderRadius: "5px",
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)"
                        }}
                    >
                        <Typography variant="h5">Selected User: {login}</Typography>
                        <CardMedia
                            component="img"
                            image={data?.avatar_url}
                        />
                        <Box component="div"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >
                            <Typography variant="body1">Likes: {data.followers}</Typography>
                            <Box component="div">
                                <IconButton onClick={handleShowCommentBubble}>
                                    <ChatBubbleOutlineIcon />
                                </IconButton>
                                <IconButton>
                                    <FavoriteBorderIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box sx={{ mb: 1, maxHeight: "200px", overflow: "scroll" }}>
                            {
                                comments.collection.length > 0 && comments.collection.map((com) => (
                                    <Box component="div" key={com.id} sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                        <Typography
                                            variant="caption"
                                            component="div"
                                            sx={{
                                                padding: "3px 5px",
                                                border: `2px solid ${com.bg}`,
                                                borderRadius: "5px",
                                                width: "fit-content",
                                                marginBottom: "2px",
                                                color: "#0B2447",
                                                background: com.bg
                                            }}
                                        >
                                            {com.value}
                                        </Typography>
                                        <Box>
                                            <IconButton onClick={() => handleEdit(com.id)}>
                                                <EditIcon sx={{ fontSize: "15px" }} />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                ))
                            }
                        </Box>
                        {
                            comments.showCommentBubble && (
                                <Box component="div">
                                    <textarea
                                        name="comment"
                                        rows="2"
                                        cols="50"
                                        style={{
                                            padding: "5px",
                                            outline: "none",
                                            borderRadius: "7px",
                                            width: "98%",
                                            fontFamily: "Arial"
                                        }}
                                        value={comments.comment}
                                        onChange={(e) => handleComment(e.target.value)}
                                    />
                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{ display: "flex", textAlign: "center", gap: "5px" }}
                                        type="button"
                                        onClick={() => edit.flag ? handleSubmitEdittedComment(edit.id) : handleSubmitComment()}
                                    >
                                        {edit.flag ? "Save" : "Send"} <SendIcon sx={{ fontSize: "15px" }} />
                                    </Button>
                                </Box>
                            )
                        }
                    </Box>
                )
            }
        </Fragment>
    )
};

export default UserSelected;