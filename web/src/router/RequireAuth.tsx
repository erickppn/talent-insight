import { useContext } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { Navigate } from "react-router-dom";

export function RequireAuth({ children }: { children: JSX.Element}) {
  const { isSigned } = useContext(AuthContext);

  if (!isSigned) {
   return <Navigate to='/' />
  }

  return children;
}