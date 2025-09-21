import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  FormHelperText,
} from "@mui/material";
import DataService from "../../config/DataService";
import { Api } from "../../config/Api";
import { toast } from "react-toastify";

const CreatePost = ({ userId, onPostCreated  }) => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });

  const [errors, setErrors] = useState({}); // to store validation errors

  useEffect(() => {
    DataService.get(Api.GET_CATEGORIES).then((res) => setCategories(res?.data?.data));
  }, []);

  const validate = () => {
    const temp = {};
    temp.title = form.title ? "" : "Title is required";
    temp.content = form.content ? "" : "Content is required";
    temp.category = form.category ? "" : "Category is required";
    temp.image = form.image ? "" : "Image is required";

    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; 
    const data = new FormData();
    data.append("title", form.title);
    data.append("content", form.content);
    data.append("category", form.category);
    data.append("userId", userId);
    if (form.image) data.append("image", form.image);

    try {
      await DataService.post(Api.POSTS, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast("Post created!");
      setForm({ title: "", content: "", category: "", image: null });
      if (onPostCreated) onPostCreated();
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("Error creating post!");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mb: 3, p: 2, border: "1px solid #ddd", borderRadius: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        Create Post
      </Typography>

      <TextField
        fullWidth
        label="Title"
        variant="outlined"
        margin="normal"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        error={Boolean(errors.title)}
        helperText={errors.title}
      />

      <TextField
        fullWidth
        label="Content"
        variant="outlined"
        multiline
        rows={3}
        margin="normal"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        error={Boolean(errors.content)}
        helperText={errors.content}
      />

      <FormControl fullWidth margin="normal" error={Boolean(errors.category)}>
        <InputLabel>Category</InputLabel>
        <Select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {categories?.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.category}</FormHelperText>
      </FormControl>

      <Button variant="outlined" component="label" sx={{ mt: 2 }}>
        Upload Image
        <input
          hidden
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />
      </Button>
      {errors.image && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {errors.image}
        </Typography>
      )}

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Post
      </Button>
    </Box>
  );
};

export default CreatePost;
