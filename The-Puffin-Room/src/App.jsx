import { Routes, Route} from "react-router-dom";
import {  useContext } from "react";

import "./css/Default.css";
import "./css/Dark.css"
import "./css/HeaderBar.css"
import "./css/NavigationBar.css"
import "./css/Article.css"
import "./css/Comment.css"
import "./css/Pagination.css"
import "./css/FilterBar.css"

import HeaderBar from "./components/HeaderBar";
import Home from "./components/Home";
import ArticlesList from "./components/ArticlesList";
import ArticleByID from "./components/ArticleByID";
import GranimCanvas from "./components/GranimCanvas";
import Login from "./components/Login";

import { LoginProvider } from "./contexts/LoginContext";
import { ThemeContext } from "./contexts/ThemeContext";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div id="root" className={theme === 'dark' ? 'darkMode' : ''}>
    <LoginProvider>
        <main>
          <HeaderBar />

          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<ArticlesList />} />
              <Route path="/article/:article_id" element={<ArticleByID />} />
              <Route path="/login" element={<Login />} />
              <Route path="/articles/:topic" element={<ArticlesList />} />
            </Routes>
          </div>

          <GranimCanvas />
        </main>
    </LoginProvider></div>
  );
}

export default App;
