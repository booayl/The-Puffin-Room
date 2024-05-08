import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import HeaderBar from "./components/0.HeaderBar";
import Home from "./components/1.Home";
import ArticlesList from "./components/2.ArticlesList";
import ArticleByID from "./components/4.ArticleByID";
import GranimCanvas from "./components/0.GranimCanvas";
import Login from "./components/8.Login";

import { LoginProvider } from "./contexts/LoginContext";

function App() {
  return (
    <LoginProvider>
      <main>
        <HeaderBar />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<ArticlesList />} />
            <Route
              path="/article/:article_id"
              element={<ArticleByID />}
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

        <GranimCanvas />
      </main>
    </LoginProvider>
  );
}

export default App;
