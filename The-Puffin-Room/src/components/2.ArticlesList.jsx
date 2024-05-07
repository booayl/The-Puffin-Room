import { useEffect, useState, useCallback } from "react";

import ArticleCard from "./3.ArticleCard.jsx";
import Loading from "./0.Loading.jsx";

import { getArticleList } from "../api.js";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true)

  const getArticles = useCallback(async () => {
    setIsLoading(true);
    getArticleList(page).then((allArticle) => {
      setArticles(allArticle);
      setIsLoading(false);
      setHasMorePages(allArticle.length >= 10); 
    });
  }, [page]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <>
      <h2>All Articles</h2>
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
              Previous
            </button>
            <button onClick={nextPage}  disabled={!hasMorePages}>
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default ArticlesList;
