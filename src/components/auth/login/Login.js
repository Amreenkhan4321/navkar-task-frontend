import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DataService from "../../../config/DataService";
import { Api } from "../../../config/Api";
import { toast } from "react-toastify";

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
    const navigate = useNavigate()
  
  //submit form
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await DataService.post(Api.USER_LOGIN, {
        email: values.email,
        password: values.password,
      });

      if (response?.data?.status === 200) {
        toast(response?.data?.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.data.id)
        navigate("/feed")
        resetForm();
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast(error.response?.data?.message || "Login failed!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <Box className="login-box">
                <Grid container spacing={2}>
                  {/* Email */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

                  {/* Password */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Typography>
                    Don't have an account?{" "}
                    <Link to="/register">Sign up here.</Link>
                  </Typography>
                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;
