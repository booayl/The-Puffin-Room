import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import HeaderBar from "./components/HeaderBar";
import Home from "./components/Home";
import ArticlesList from "./components/ArticlesList";
import ArticleByID from "./components/ArticleByID";
import GranimCanvas from "./components/GranimCanvas";
import Login from "./components/Login";
import NavigationBar from "./components/NavigationBar";
import ArticleByTopics from "./components/ArticleByTopics";

import { LoginProvider } from "./contexts/LoginContext";

function App() {
  return (
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
              <Route path="/articles/:topic" element={<ArticleByTopics />} />
            </Routes>
          </div>

          <GranimCanvas />
        </main>
    </LoginProvider>
  );
}

export default App;
