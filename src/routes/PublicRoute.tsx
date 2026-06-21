import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { JSX } from "react"
import type { RootState } from "../store/store";
import Spinner from "../components/General/Spinner";

interface Props {
  children: JSX.Element
}

const PublicRoute = ({ children }: Props) => {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth,
  );

  if(loading) {
    return <Spinner/>
  };

  if(isAuthenticated) {
    return <Navigate to="/" replace />
  };

  return children;
}

export default PublicRoute;