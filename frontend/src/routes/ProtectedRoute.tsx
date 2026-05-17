import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const token = localStorage.getItem("token");

  // ❌ Not logged in → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → allow access
  return children;
};

export default ProtectedRoute;