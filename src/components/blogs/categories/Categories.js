import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import DataService from "../../../config/DataService";
import { Api } from "../../../config/Api";

const Categories = ({ onSelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    DataService.get(Api.GET_CATEGORIES).then((res) => setCategories(res?.data?.data));
  }, []);

  return (
    <Box mb={3}>
      <Typography variant="h6">Categories</Typography>
      {categories.map((cat) => (
        <Button
          key={cat._id}
          variant="outlined"
          sx={{ m: 1 }}
          onClick={() => onSelect(cat._id)}
        >
          {cat.name}
        </Button>
      ))}
    </Box>
  );
};

export default Categories;
