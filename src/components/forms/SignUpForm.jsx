import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { auth, db } from "../../firebase/config";

const SignUpForm = () => {
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
        "Email is invalid"
      ),
    password: yup
      .string()
      .required("Password is required!")
      .min(8, "Password must be at least 8 characters!")
      .matches(/[a-z]/, "At least one lowercase character!")
      .matches(/[A-Z]/, "At least one uppercase character!")
      .matches(/[\W_]/, "At least 1 special character (@, !, #, etc)!")
      .matches(/[0-9]/, "Must Include One Number"),
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
  const submitForm = async (data) => {
    console.log(data);
    
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.emailId, data.password);
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          id: user.uid,
          email: user.email,
          credentails: []
        });
      }
      toast.success("User Registered Successfully!");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      
      toast.error(`Registration Failed Due To ${error.message}`);
      setLoading(false);
    }
    reset();
  };

  return (
    <form className=""
    onSubmit={handleSubmit(submitForm)}
>
      <div className="formElement my-4">
        <Controller
          name="emailId"
          control={control}
          render={({ field }) => <input {...field} placeholder="Email Id" className="text-black border px-5 py-2 rounded-lg !w-full"/>}
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
                className="text-black border rounded-lg px-5 py-2 !w-full"
              />
              <span
                className="absolute top-2 right-3 text-[#fff] cursor-pointer"
                onClick={togglePasswordVisibility}
              >
               ${showPassword ? <VisibilityOffIcon
               className="!text-gray-500"/> : <VisibilityIcon className="!text-gray-500"/>}
              </span>
            </>
          )}
        />
        <p className="errorPara">{errors.password?.message}</p>
      </div>

      <p className="text-[#949393d7] text-xs mb-4 sm:hidden block">Already have a account ? <Link to="/login"><span className="font-bold"> Login Here </span></Link> </p>

      <div className="formElement max-w-[80px]">
     
      
          <Button
            className="!text-xs !normal-case"
            type="submit"
            variant="contained"
            disabled={loading}
          >
            { loading ? "Loading..." :"Register"}
          </Button>
       
      </div>
    </form>
  );
};

export default SignUpForm;
