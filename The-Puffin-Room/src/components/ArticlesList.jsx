import { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard.jsx";
import { getArticleList } from "../api.js";
import NavigationBar from "./NavigationBar";
import ErrorBox from "./ErrorBox.jsx";

function ArticlesList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortByQuery = searchParams.get("sort_by") || "date" ;
  const orderQuery = searchParams.get("order") || "desc";
  const pageQuery = searchParams.get("p") || 1

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState( pageQuery );
  const [totalPages, setTotalPages] = useState(1);
  const [sorting, setSorting] = useState(sortByQuery);
  const [order, setOrder] = useState(orderQuery);
  const [errorData, setErrorData] = useState({ status: 0, message: "" });

  const { topic } = useParams();

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
        setArticles(allArticles);
        setTotalPages(Math.ceil(allArticles[0].total_count / 10));
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
      newParams.set("p",page)
      setSearchParams(newParams);
  }, [page, topic, sorting, order]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

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
    <>
      <NavigationBar />
      <div className="filterBar">
        <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
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
                <ArticleCard article={article}/>
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
    </>
  );
}

export default ArticlesList;
