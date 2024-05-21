import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import "./css/Default.css";
import "./css/Dark.css";
import "./css/HeaderBar.css";
import "./css/NavigationBar.css";
import "./css/Article.css";
import "./css/Comment.css";
import "./css/Pagination.css";
import "./css/FilterBar.css";
import "./css/HighlightArticle.css";
import "./css/mostVotedArticle.css";
import "./css/Loading.css";
import "./css/NewestArticle.css";
import "./css/TopicTop.css";
import "./css/Login.css"
import "./css/PostArticle.css"

import HeaderBar from "./components/HeaderBar";
import Home from "./components/Home";
import ArticlesList from "./components/ArticlesList";
import ArticleByID from "./components/ArticleByID";
import GranimCanvas from "./components/GranimCanvas";
import Login from "./components/Login";
import ErrorBox from "./components/ErrorBox";
import PostArticle from "./components/PostArticle";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

import { LoginProvider } from "./contexts/LoginContext";
import { ThemeContext } from "./contexts/ThemeContext";
import { RenderContext } from "./contexts/RenderContext";

function App() {
  const { theme } = useContext(ThemeContext);
  const { render } = useContext(RenderContext);

  return (
    <div id="root" className={theme === "dark" ? "darkMode" : ""}>
      <LoginProvider>
        <main>
          <HeaderBar />
          <NavigationBar />

          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<ArticlesList />} />
              <Route path="/article/:article_id" element={<ArticleByID />} />
              <Route path="/login" element={<Login />} />
              <Route path="/articles/:topic" element={<ArticlesList />} />
              <Route path="/articles/create" element={<PostArticle />} />
              <Route
                path="*"
                element={<ErrorBox status={404} message={"Page not found"} />}
              />
            </Routes>
          </div>
          <Footer />
          <GranimCanvas />
        </main>
      </LoginProvider>
    </div>
  );
}

export default App;
