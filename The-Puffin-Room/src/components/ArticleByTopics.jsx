import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard.jsx";
import Loading from "./Loading.jsx";
import {getArticleByTopic } from "../api.js";
import NavigationBar from "./NavigationBar";

function ArticleByTopics() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const { topic } = useParams();
  const reformattedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);

  const getArticles = useCallback(() => {
    setIsLoading(true);
    getArticleByTopic(topic)
      .then((allArticles) => {
        setArticles(allArticles);
        setTotalPages(Math.ceil(allArticles[0].total_count / 10));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setIsLoading(false);
      });
  }, [page,topic]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <>
    <NavigationBar />
      <h2>{reformattedTopic}</h2>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <>
          <div className="card-container">
            {articles.map((article) => (
              <div key={article.article_id}>
                <ArticleCard article={article} setIsLoading={setIsLoading} />
              </div>
            ))}
          </div>
          <div className="pagination">
            <button onClick={prevPage} disabled={page === 1}>
            ←
            </button>
            {[...Array(totalPages).keys()].map((pageNum) => (
              <button
                key={pageNum + 1}
                onClick={() => setPage(pageNum + 1)}
                className={pageNum + 1 === page ? "current-page" : ""}
              >
                {pageNum + 1}
              </button>
            ))}
            <button onClick={nextPage} disabled={page === totalPages}>
            →
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default ArticleByTopics;
