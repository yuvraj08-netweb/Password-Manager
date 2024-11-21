import SignUpForm from "../components/forms/SignUpForm";

const Register = () => {
  return (
    <div className="!w-full !h-[100vh] flex justify-center items-center bg-slate-100 dark:!bg-[#14181B]">
      <div className="border dark:!border-none px-5 py-7 shadow-xl bg-white dark:!bg-gray-800 !w-[80%] rounded-xl">
        <h2 className="text-xl !text-black dark:!text-white">Register</h2>
        <SignUpForm />
      </div>
    </div>
  );
};

export default Register;
