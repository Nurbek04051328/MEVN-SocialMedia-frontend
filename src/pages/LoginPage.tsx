import LoginUserForm from '../components/AuthPageComponent/LoginUserForm'

const LoginPage = () => {
  return (
    <div className="h-screen flex flex-col gap-5 md:gap-10 items-center">
      <div className="flex flex-col items-center gap-2 md:gap-5 pt-12">
        <h1 className="text-2xl md:text-5xl text-[#9929EA] font-bold">
          Welcome To Bookblogs
        </h1>
        <p className="text-white md:text-2xl">A place To Flex Your Creation</p>
      </div>
      <div className="flex flex-col w-full md:w-1/2 p-4 rounded-xl shadow-2xl shadow-gray-800">
        <h1 className="text-white text-xl mb-4">Login To Your Account</h1>
        <LoginUserForm />
      </div>
    </div>
  )
}

export default LoginPage
