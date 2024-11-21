"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getProducts,  } from "../../reducers/userSlice";
import { useNavigate } from "react-router-dom";

const AddDataForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userDetails } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const schema = yup.object().shape({
    project: yup.string().required("Email is required !"),
    url: yup.string().required("please provide the url to project"),
    username: yup.string().required("please provide the username"),
    password: yup.string().required("Please Enter Password"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      project: "",
      url: "",
      username: "",
      password: "",
    },
  });

  const submitForm = async (data) => {
    setLoading(true);
    const dataObject = {
      project: data.project,
      url: data.url,
      username: data.username,
      password: data.password,
    };
    
    try {
      dispatch(addProduct({userDetails, dataObject} ))
        .unwrap()
        .then(() => {
          dispatch(getProducts(userDetails.id))
            .unwrap()
            .then(() => {
              reset();
              setLoading(false);
              navigate("/userArea");
            });
        });
    } catch (error) {
      setLoading(false);
      console.error("Update Error:", error.message);
    }
  };

  return (
    <form
      className="!w-full loginForm flex flex-col gap-3 py-5"
      onSubmit={handleSubmit(submitForm)}
    >
      <div className="formElement">
        <Controller
          name="project"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="project name"
              className="border px-6 py-1 rounded-lg !w-full !text-gray-800"
            />
          )}
        />
        <p className="errorPara">{errors.project?.message}</p>
      </div>
      <div className="formElement">
        <Controller
          name="url"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="project url"
              className="border px-6 py-1 rounded-lg !w-full !text-gray-800"
            />
          )}
        />
        <p className="errorPara">{errors.url?.message}</p>
      </div>
      <div className="formElement">
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="username"
              className="border px-6 py-1 rounded-lg !w-full !text-gray-800"
            />
          )}
        />
        <p className="errorPara">{errors.username?.message}</p>
      </div>
      <div className="formElement relative">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                placeholder="password"
                type={showPassword ? "text" : "password"}
                id="password"
                className="border px-6 py-1 rounded-lg !w-full !text-gray-800"
              />
              <span
                className="absolute top-1 right-3 text-[#fff] cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {!showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#aaa"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-eye-off"
                  >
                    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                    <path d="m2 2 20 20" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#aaa"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-eye"
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </span>
            </>
          )}
        />
        <p className="errorPara">{errors.password?.message}</p>
      </div>
      <div className="formElement">
        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          className="!w-full !normal-case !bg-blue-600"
        >
          {loading ? <CircularProgress color="#fff" size={"20px"} /> : "Add"}
        </Button>
      </div>
    </form>
  );
};

export default AddDataForm;
