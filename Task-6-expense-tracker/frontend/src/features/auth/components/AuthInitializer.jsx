import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthInitializer = ({ children }) => {
  const { fetchUser } = useAuth();

  useEffect(() => {
    fetchUser().catch(() => {});
  }, []);

  return children;
};

export default AuthInitializer;