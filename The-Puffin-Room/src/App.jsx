import { Routes, Route } from "react-router-dom";
import "./App.css";

import HeaderBar from "./components/0.HeaderBar";
import Home from "./components/1.Home";
import ArticlesList from "./components/2.ArticlesList";
import ArticleByID from "./components/4.ArticleByID";

function App() {
  return (
    <>
      <HeaderBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/article/:article_id" element={<ArticleByID />} />
      </Routes>
    </>
  );
}

export default App;
