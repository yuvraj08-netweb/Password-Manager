import SignUpForm from "../components/forms/SignUpForm";

const Register = () => {
  return (
    <div className="!w-full !h-[100vh] flex justify-center items-center bg-slate-100">
      <div className="border px-5 py-7 shadow-xl bg-white !w-[80%] rounded-xl">
        <h2 className="text-xl !text-black">Register</h2>
        <SignUpForm />
      </div>
    </div>
  );
};

export default Register;
