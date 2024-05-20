import { createContext, useState } from 'react'
export const RenderContext = createContext()

export const RenderProvider = ({children}) =>{
const [render, setRender] = useState(true);

  return (
    <RenderContext.Provider value={{render, setRender}}>
        {children}
        </RenderContext.Provider>
  )
}