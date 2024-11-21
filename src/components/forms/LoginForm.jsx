import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import {signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { auth } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../../reducers/userSlice";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const schema = yup.object().shape({
    emailId: yup
      .string()
      .required("Email is required !")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Email is Invalid"
      ),
    password: yup
      .string()
      .required("Password is required!")
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
      emailId: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitForm = async (data) => {
    setLoading(true);
    try {
        await signInWithEmailAndPassword(auth, data.emailId, data.password).then(
        () => {
          reset();
          dispatch(fetchUserData()).unwrap().then(async ()=> {
            navigate("/userArea");
            setLoading(false);
          })
        }
      );
    } catch (error) {
      console.error(`Log In Failed Due To : ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <form className="loginForm"
    onSubmit={handleSubmit(submitForm)}
>
      <div className="formElement my-4">
        <Controller
          name="emailId"
          control={control}
          render={({ field }) => <input {...field} placeholder="Email Id" className="text-black border !w-full px-5 py-2 rounded-lg"/>}
        />
        <p className="errorPara">{errors.emailId?.message}</p>
      </div>
      <div className="formElement relative">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                id="password"
                className="text-black !w-full border rounded-lg px-5 py-2"
              />
              <span
                className="absolute top-2 right-3 text-[#fff] cursor-pointer"
                onClick={togglePasswordVisibility}
              >
              {showPassword ? <VisibilityOffIcon className="!text-gray-500"/> : <VisibilityIcon className="!text-gray-500"/>}
              </span>
            </>
          )}
        />
        <p className="errorPara">{errors.password?.message}</p>
      </div>

      <p className="text-[#949393d7] text-xs mb-4 mt-2 sm:hidden block">Don`t have a account ? <Link to="/register"><span className="font-bold"> Register Here </span></Link> </p>

      <div className="formElement max-w-[80px]">
     
      
          <Button
            className="!text-xs !normal-case !bg-blue-600"
            type="submit"
            variant="contained"
            disabled={loading}
          >
            { loading ? "Loading..." :"Login"}
          </Button>
       
      </div>
    </form>
  );
};

export default LoginForm;
