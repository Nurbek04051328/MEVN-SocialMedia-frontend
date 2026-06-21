import Spinner from "../components/General/Spinner";
import type { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { logoutUser } from "../api/auth.api";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/General/Navbar";
import SideBar from "../components/General/SideBar";

const FeedPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state:RootState) => state.auth.user);
  const { loading } = useSelector((state: RootState) => state.auth);
  const [ serverError, setServerError ] = useState<string | null>(null);

  if(loading) {
    return (
      <Spinner/>
    )
  }

  const handleLogout = async() => {
    try {
      const response = await logoutUser();
      toast.success(response.message);
      dispatch(logout());
      navigate("/login", { replace: true });
    } catch (error:any) {
      setServerError(error.message);
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container flex">
        <SideBar />
        <div>
          <h1>This is the feed page</h1>
        </div>
      </div>
    </div>
  )
}

export default FeedPage
