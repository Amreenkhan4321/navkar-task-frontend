import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Modal,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";

import CreatePost from "./CreatePost";
import PostFeed from "./PostFeed";
import DataService from "../../config/DataService";
import { Api } from "../../config/Api";
import { useNavigate } from "react-router-dom";

const FeedPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [postsUpdated, setPostsUpdated] = useState(false);
  const userId = localStorage.getItem("userId");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await DataService.get(Api.GET_CATEGORIES);
        setCategories(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const handlePostCreated = () => {
    setPostsUpdated((prev) => !prev);
    setModalOpen(false);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/"); // redirect to login page
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4">📸 Social App</Typography>
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
     
      {/* Create Post Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => setModalOpen(true)}
      >
        Create Post
      </Button>

      {/* Category Dropdown */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Filter by Category</InputLabel>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Modal for Create Post */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 500 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <CreatePost userId={userId} onPostCreated={handlePostCreated} />
        </Box>
      </Modal>

      {/* Posts */}
      <PostFeed categoryId={categoryId} postsUpdated={postsUpdated} />
    </Container>
  );
};

export default FeedPage;
