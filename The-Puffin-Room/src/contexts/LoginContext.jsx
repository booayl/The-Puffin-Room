import { createContext, useState } from 'react'
export const LoginContext = createContext()

export const LoginProvider = ({children}) =>{
  const [token, setToken] = useState(false);
  const [loggedUser, setloggedUser] = useState({});

  return (
    <LoginContext.Provider value={{loggedUser, setloggedUser,token,setToken}}>
        {children}
        </LoginContext.Provider>
  )
}