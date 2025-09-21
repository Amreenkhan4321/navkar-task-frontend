import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import API, { Api } from "../../config/Api";
import DataService from "../../config/DataService";
import CommentBox from "./CommentBox";

const PostFeed = ({ categoryId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (categoryId) {
      DataService.get(`${Api.POSTS}/${categoryId}`).then((res) => setPosts(res.data));
    }
  }, [categoryId]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Posts
      </Typography>
      {posts.map((post) => (
        <Card key={post._id} sx={{ mb: 3 }}>
          {post.image && (
            <CardMedia
              component="img"
              height="300"
              image={`http://localhost:5000/uploads/${post.image}`}
              alt={post.title}
            />
          )}
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {post.content}
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Posted by {post.user?.name}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PostFeed;
