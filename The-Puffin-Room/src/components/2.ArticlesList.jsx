import { useEffect, useState, useCallback } from "react";
import ArticleCard from "./3.ArticleCard.jsx";
import Loading from "./0.Loading.jsx";
import { getArticleList } from "../api.js";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const getArticles = useCallback(() => {
    setIsLoading(true);
    getArticleList(page)
      .then((allArticles) => {
        setArticles(allArticles);
        setTotalPages(Math.ceil(allArticles[0].total_count / 10));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setIsLoading(false);
      });
  }, [page]);

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

export default ArticlesList;
