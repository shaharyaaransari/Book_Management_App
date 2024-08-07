import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const ContextProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [isAuth, setAuth] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true); 
    }
  }, []);
  return (
    <AuthContext.Provider value={{ isAuth, setAuth, title, setTitle }}>
      {children}
    </AuthContext.Provider>
  );
};
export default ContextProvider;
