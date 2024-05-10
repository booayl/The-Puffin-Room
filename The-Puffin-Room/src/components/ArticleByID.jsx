import { getAricleByID } from "../api.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import CommentSection from "./CommentSection.jsx";
import ArticleVotes from "./ArticleVotes.jsx";
import Loading from "./Loading.jsx";
import ErrorBox from "./ErrorBox.jsx";

function ArticleByID() {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorData, setErrorData] = useState({ status: 0, message: "" });

  const { article_id } = useParams();

  useEffect(() => {
    getAricleByID(article_id)
      .then((articleData) => {
        setArticle(articleData);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false)
        setErrorData({
          ...errorData,
          status: error.status,
          message: error.message,
        });
      });
  }, [setArticle]);

  const date = dateFormat(article.created_at, "fullDate");

  if (errorData.status !== 0) {
    return <ErrorBox status={errorData.status} message={errorData.message} />;
  }

  return (
    <div className="articleByID">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            <p className="topic">{article.topic}</p>
            <h1>{article.title}</h1>
            <>By {article.author}</>
            <p>{date}</p>
            <img src={article.article_img_url} />
          </div>

          <p className="articleBody">{article.body}</p>

          <div className="voteAndCommentBar">
            <ArticleVotes articleVotes={article.votes} />
          </div>

          <CommentSection article_id={article_id} />
        </>
      )}
    </div>
  );
}

export default ArticleByID;
