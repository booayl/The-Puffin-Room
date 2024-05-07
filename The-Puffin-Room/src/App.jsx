import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'

import HeaderBar from './components/0.HeaderBar';
import Home from './components/1.Home'
import ArticlesList from './components/2.ArticlesList'


function App() {

  return (
    <>
    <HeaderBar/>

 <Routes>
 <Route path="/" element={<Home/>}/>
 <Route path="/articles" element={<ArticlesList/>}/>
 </Routes>
    </>
  )
}

export default App
