import NavigationBar from "./NavigationBar";
import { getArticleList } from "../api.js";
import { useState, useEffect } from "react";
import HighlightArticle from "./HighlightArticles.jsx";
import MostVotedArticle from "./MostVotedArticle.jsx";
import NewestArticle from "./NewestArticle.jsx"
import Loading from "./Loading.jsx";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mostCommentedArticles, setmostCommentedArticles] = useState([]);
  const [mostVotedArticles, setmostVotedArticles] = useState([]);
  const [newestArticles, setNewestArticles] = useState([]);

  const getMostCommentedArticles = () => {
    const params = {
      p: 1,
      sort_by: "comment_count",
      order: "desc",
    };

    getArticleList(params)
      .then((allArticles) => {
        setIsLoading(true);
        setmostCommentedArticles(allArticles[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorData({
          ...errorData,
          status: error.status,
          message: error.message,
        });
      });
  };

  const getTopVotedArticles = () => {
    const params = {
      p: 1,
      sort_by: "votes",
      order: "desc",
    };

    getArticleList(params)
      .then((allArticles) => {
        setIsLoading(true);
        setmostVotedArticles(allArticles.slice(0, 3));
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorData({
          ...errorData,
          status: error.status,
          message: error.message,
        });
      });
  };

  const getNewestArticles = () => {
    const params = {
      p: 1,
      sort_by: "created_at",
      order: "desc",
    };

    getArticleList(params)
      .then((allArticles) => {
        setIsLoading(true);
        setNewestArticles(allArticles[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorData({
          ...errorData,
          status: error.status,
          message: error.message,
        });
      });
  };

  useEffect(() => {
    getMostCommentedArticles();
    getTopVotedArticles();
    getNewestArticles()
  }, [setmostCommentedArticles, setmostVotedArticles,setNewestArticles]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <HighlightArticle article={mostCommentedArticles} />

          <div className="SectionTitle">
            <h2>Forum Favourite</h2>
            <h4>Top Voted by the Community</h4>
          </div>
          <div className="mostVotedArticle">
            {mostVotedArticles.map((article, index) => (
              <div key={index} className={index === 2 ? "lastArticle" : "borderLine"}>
              <MostVotedArticle
                key={article.article_id}
                article={article}
              /></div>
            ))}
          </div>

          <NewestArticle article={newestArticles} />

        </div>
      )}
    </>
  );
}

export default Home;
