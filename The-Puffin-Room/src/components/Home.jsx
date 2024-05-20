import NavigationBar from "./NavigationBar";
import { getArticleList } from "../api.js";
import { useState, useEffect } from "react";
import HighlightArticle from "./HighlightArticles.jsx";
import MostVotedArticle from "./MostVotedArticle.jsx";
import Loading from "./Loading.jsx";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mostCommentedArticles, setmostCommentedArticles] = useState([]);
  const [mostVotedArticles, setmostVotedArticles] = useState([]);

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

  useEffect(() => {
    getMostCommentedArticles()
    getTopVotedArticles()
  }, [setmostCommentedArticles,setmostVotedArticles]);
  

  return (
    <>
      {isLoading ? <Loading /> : (
        <div>
          <HighlightArticle
            article={mostCommentedArticles}
          />

<div className="SectionTitle">
          <h2>Forum Favourite</h2>
          <h4>Top Voted by the Community</h4>
</div>
          <div className="mostVotedArticle">
            {mostVotedArticles.map((article) => (
                <MostVotedArticle key={article.article_id} article={article} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
