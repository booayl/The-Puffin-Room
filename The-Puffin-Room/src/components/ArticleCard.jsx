import { Link } from "react-router-dom";
import dateFormat from "dateformat";

import { LoginContext } from "../contexts/LoginContext";
import { useContext, useState, useEffect } from "react";
import { deleteArticle } from "../api";
import { RenderContext } from "../contexts/RenderContext";

import ErrorBox from "./ErrorBox";

function ArticleCard({ article }) {
  const date = dateFormat(article.created_at, "mediumDate");

  const { loggedUser } = useContext(LoginContext);
  const { setRender } = useContext(RenderContext);

  const [isDeleted, setIsDeleted] = useState(false);
  const [errorData, setErrorData] = useState({ status: 0, message: "" });

  useEffect(() => {
    if (isDeleted) {
      const timer = setTimeout(() => {
        setRender((prev) => !prev); 
      }, 500); 

      return () => clearTimeout(timer);
    }
  }, [isDeleted, setRender]);

  const handleClick = () => {
    deleteArticle(article.article_id)
      .then(() => setIsDeleted(true))
      .catch((error) => {
        setErrorData({
          ...errorData,
          status: error.status,
          message: error.message,
        });
      });
  };

  if (errorData.status !== 0) {
    return <ErrorBox status={errorData.status} message={errorData.message} />;
  }

  return !isDeleted ? (
    <div className="articleCard">
      {isDeleted ? (
        <p className="alertBox">Article has been successfully deleted</p>
      ) : (
        <>
        
          <img src={article.article_img_url} />
          <div className="articleCardData">{article.author === loggedUser.username && !isDeleted && (
        <button className= "deleteButton" onClick={handleClick}>x</button>
      )}
            <p className="topic">{(article.topic).charAt(0).toUpperCase() + (article.topic).slice(1)}</p>
            <h1>{article.title}</h1>
            <>By {article.author}</>
            <p>{date}</p>
            <div className="icon">
            <img src="https://i.ibb.co/tHRcH6j/red-heart.png" />
      <span>{article.votes}</span>

      <img src="https://i.ibb.co/NTNVtdQ/Asset-4.png" />
        <span>{article.comment_count}</span></div>

            <Link to={`/article/${article.article_id}`}>→</Link>
          </div>
        </>
      )}
    </div>
  ) : null;
}

export default ArticleCard;
