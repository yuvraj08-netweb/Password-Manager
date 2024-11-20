import LoginForm from "../components/forms/LoginForm"

const Login = () => {
  return (
    <div className="!w-full !h-[100vh] flex justify-center items-center bg-slate-100">
    <div className="border px-5 py-7 shadow-xl bg-white !w-[80%] rounded-xl">
      <h2 className="text-xl !text-black">Login</h2>
      <LoginForm />
    </div>
  </div>
  )
}

export default Login