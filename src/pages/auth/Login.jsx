import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { currentProfile, loginFailure } from "@/features/auth/authSlice";
import { useNavigate } from "react-router";
import { useState } from "react";

// Validation Schema
const schema = yup.object({
  email: yup.string().email("Enter your valid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur", // Ensures validation happens on submit
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    if (!formData.email && !formData.password) {
      return;
    }

    try {
      const { data } = await axios.post("http://38.242.131.177:4000/api/v1/auth/login", formData);

      if (data.code === 200) {
        localStorage.setItem("access-token", data.data.accessToken);

        localStorage.setItem("refresh-token", data.data.refreshToken);

        dispatch(currentProfile());
        reset();
        setLoading(false);
        navigate("/contacts");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      dispatch(loginFailure("Login Failed"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl">
        <h2 className="text-xl font-bold mb-2 text-center">Welcome Back!</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Please enter your details to sign in to your account
        </p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email Field */}
          <div className="mb-4">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                onBlur: () => trigger("email"), // Validate on focus out
                onChange: () => trigger("email"), // Validate on input change
              })}
            />
            {/* Error Message */}
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <Label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                onBlur: () => trigger("password"), // Validate on focus out
                onChange: () => trigger("password"), // Validate on input change
              })}
            />
            {/* Error Message */}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-between items-center mb-4">
            <Link to="/forgot-password" className="text-sm text-blue-600">
              {" "}
              {/* Use Link component here */}
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-green-600 text-white hover:bg-green-800"
          >
            {loading ? "Loading..." : "Sign In"}
          </Button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-600 font-medium">
            {" "}
            {/* Use Link component here */}
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
