import { createContext, useState } from 'react'
export const LoginContext = createContext()

export const LoginProvider = ({children}) =>{
  const [token, setToken] = useState(0);
  const [user, setUser] = useState("");

  return (
    <LoginContext.Provider value={{user, setUser,token,setToken}}>
        {children}
        </LoginContext.Provider>
  )
}