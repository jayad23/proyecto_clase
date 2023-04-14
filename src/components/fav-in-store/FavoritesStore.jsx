import React from "react";
import { Box, Button, CardMedia, Divider, IconButton, Typography } from "@mui/material";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MarkUnreadChatAltRoundedIcon from '@mui/icons-material/MarkUnreadChatAltRounded';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import { useHandleComments } from "../../hooks/useHandleComents";
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';

const defaultValues = {
  showCommentBubble: false,
  comment: "",
  collection: [],
};

const FavoritesStore = ({ user }) => {
  const {
    comments,
    edit,
    handleShowCommentBubble,
    handleComment,
    handleSubmitComment,
    handleEdit,
    handleSubmitEdittedComment,
    handleLikeComment,
    inLoggin,
  } = useHandleComments(user?.values ? user.values : defaultValues);

  return (
    <Box component="div"
      sx={{
        width: "300px",
        border: "1px solid grey",
        p: 2,
        borderRadius: "5px",
      }}
    >
      <Typography variant="h5">Selected User: {user.login}</Typography>
      <CardMedia
        component="img"
        image={user?.avatar_url}
        sx={{ width: "300px" }}
      />
      <Box component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Typography variant="body1">Likes: {user.followers}</Typography>
        <Box component="div">
          <IconButton disabled={!comments.collection.length > 0} onClick={handleShowCommentBubble}>
            {comments.collection.length > 0 ? <MarkUnreadChatAltRoundedIcon /> : <ChatBubbleOutlineIcon />}
          </IconButton>
          <IconButton disabled>
            <FavoriteRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ mb: 1, maxHeight: "200px", overflow: "scroll" }}>
        {
          comments.collection.length > 0 && comments.showCommentBubble && comments.collection.map((com) => (
            <Box component="div" key={com.id} sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Box
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
                <Typography
                  variant="caption"
                  component="div"
                >
                  {com.value}
                </Typography>
                <Divider />
                <Typography variant="caption" component="div" sx={{ fontSize: "8px" }}>
                  {com.createdAt} / {com.by}
                </Typography>
              </Box>
              <Box
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box>
                  <IconButton disabled={inLoggin !== com.by} onClick={() => handleEdit(com.id, user)}>
                    <EditIcon sx={{ fontSize: "12px" }} />
                  </IconButton>
                </Box>
                <Box>
                  <Box component="div" sx={{ padding: 0, position: "relative" }}>
                    {com.liked > 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: `${com.liked >= 100 ? "-6px" : "-2px"}`,
                          right: `${com.liked >= 100 ? "-6px" : "-3px"}`,
                          borderRadius: "100%",
                          background: "red",
                          padding: `${com.liked >= 100 ? "5px 2.5px" : "3px 5px"}`,
                          fontSize: "9px",
                          color: "white",
                        }}
                      >
                        {com.liked}
                      </Box>
                    )}
                    <IconButton disabled={com.likedBy.some(element => element === inLoggin)} onClick={() => handleLikeComment(com.id, user)} >
                      {com.liked > 0 ? <ThumbUpOffAltRoundedIcon sx={{ fontSize: "12px" }} /> : <ThumbUpOffAltOutlinedIcon sx={{ fontSize: "12px" }} />}
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))
        }
      </Box>
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
          onClick={() => edit.flag ? handleSubmitEdittedComment(edit.id, user) : handleSubmitComment(user)}
        >
          {edit.flag ? <SaveAsRoundedIcon sx={{ fontSize: "15px" }} /> : <SendIcon sx={{ fontSize: "15px" }} />}
        </Button>
      </Box>
    </Box>
  )
}

export default FavoritesStore