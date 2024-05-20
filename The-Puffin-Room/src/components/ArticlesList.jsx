import { useEffect, useState, useCallback, useContext } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard.jsx";
import { getArticleList, deleteTopic } from "../api.js";
import ErrorBox from "./ErrorBox.jsx";
import Loading from "./Loading.jsx";

import { RenderContext } from "../contexts/RenderContext.jsx"

function ArticlesList() {
  const { render, setRender } = useContext(RenderContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortByQuery = searchParams.get("sort_by") || "date";
  const orderQuery = searchParams.get("order") || "desc";
  const pageQuery = searchParams.get("p") || 1;

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(pageQuery);
  const [totalPages, setTotalPages] = useState(1);
  const [sorting, setSorting] = useState(sortByQuery);
  const [order, setOrder] = useState(orderQuery);
  const [errorData, setErrorData] = useState({ status: 0, message: "" });
  const [isLoading, setIsLoading] = useState(true);

  const { topic } = useParams();
  const navigate = useNavigate();

  const sortingOptions = {
    date: "created_at",
    commentCount: "comment_count",
    votes: "votes",
    author: "author",
  };

  const getArticles = useCallback(() => {
    const params = {
      p: page,
      topic: topic,
      sort_by: sortingOptions[sorting],
      order: order,
    };

    getArticleList(params)
      .then((allArticles) => {
        setIsLoading(true);
        setArticles(allArticles);
        if (allArticles.length === 0 && topic) {
          deleteTopic(topic)
          .then(() => {
            setRender((prev) => !prev);
            navigate("/articles")
          })
            .catch((error) => {
              setErrorData({
                ...errorData,
                status: error.status,
                message: error.message,
              });
            });
        } else {
          setTotalPages(Math.ceil(allArticles[0]?.total_count / 10) || 1);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorData({
          ...errorData,
          status: error.status,
          message: error.message,
        });
      });

    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", sorting);
    newParams.set("order", order);
    newParams.set("p", page);
    setSearchParams(newParams);
  }, [page, topic, sorting, order, setArticles]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  useEffect(() => {
    getArticles();
  }, [getArticles, render]);

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (errorData.status !== 0) {
    return <ErrorBox status={errorData.status} message={errorData.message} />;
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="filterBar">
            <select
              value={sorting}
              onChange={(e) => setSorting(e.target.value)}
            >
              <option value="date">Date</option>
              <option value="commentCount">Comment</option>
              <option value="author">Author</option>
              <option value="votes">Votes</option>
            </select>

            <select value={order} onChange={(e) => setOrder(e.target.value)}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>

          <>
            <div className="card-container">
              {articles.map((article) => (
                <div key={article.article_id}>
                  <ArticleCard article={article} />
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
        </div>
      )}
    </div>
  );
}

export default ArticlesList;
