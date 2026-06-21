import RegisterUserForm from "../components/AuthPageComponent/RegisterUserForm";

const RegisterPage = () => {
  return (
    <div className="h-screen flex flex-col gap-5 md:gap-10 items-center overflow-y-auto">
      <div className="flex flex-col items-center gap-2 md:gap-5 pt-10">
        <h1 className="text-2xl md:text-5xl text-[#9929EA] font-bold">
          Welcome To Bookblogs
        </h1>
        <p className="text-white md:text-2xl">A place To Flex Your Creation</p>
      </div>
      <div className="flex flex-col w-full md:w-1/2 px-4 py-1 rounded-xl shadow-2xl shadow-gray-800">
        <h1 className="text-white text-xl mb-4">Create Your Account</h1>
        <RegisterUserForm />
      </div>
    </div>
  )
}

export default RegisterPage;
