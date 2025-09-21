import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import  { Api } from "../../config/Api";
import DataService from "../../config/DataService";
import { toast } from "react-toastify";

const CommentBox = ({ postId, userId }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await DataService.post(Api.COMMENTS, { text, userId, postId });
    toast("Comment added!");
    setText("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: "flex" }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="submit" variant="outlined" sx={{ ml: 1 }}>
        Send
      </Button>
    </Box>
  );
};

export default CommentBox;
