import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

// Validation Schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required("Confirm Password is required"),
  terms: yup.boolean().oneOf([true], "You must accept the terms and conditions"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log("Signup Data: ", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-2 text-center">Welcome To EMALC!</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Please enter your details to sign up your account
        </p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Full Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                {...register("name", {
                  onBlur: () => trigger("name"), // Validate on focus out
                  onChange: () => trigger("name"), // Validate on input change
                })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  onBlur: () => trigger("email"), // Validate on focus out
                  onChange: () => trigger("email"), // Validate on input change
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  onBlur: () => trigger("password"), // Validate on focus out
                  onChange: () => trigger("password"), // Validate on input change
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
                {...register("confirmPassword", {
                  onBlur: () => trigger("confirmPassword"), // Validate on focus out
                  onChange: () => trigger("confirmPassword"), // Validate on input change
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="mb-4 flex items-center gap-2">
            <input type="checkbox" id="terms" {...register("terms")} className="w-4 h-4" />
            <Label htmlFor="terms">Accept Terms and Condition</Label>
          </div>
          {errors.terms && <p className="text-red-500 text-sm mb-4">{errors.terms.message}</p>}

          {/* Submit Button */}
          <Button type="submit" className="w-full h-12 bg-green-600 text-white hover:bg-green-800">
            Sign Up
          </Button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link to={"/login"} className="text-green-600 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
