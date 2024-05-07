import { getAricleByID } from "../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import CommentSection from "./5.CommentSection";
import { getCommentsByArticleID } from "../api";

function ArticleByID() {
  const [article, setArticle] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    getAricleByID(article_id).then((articleData) => {
      setArticle(articleData);
    });
  }, [setArticle]);

  useState(() => {
    getCommentsByArticleID(article_id).then((commments) => {
      setAllComments(commments);
    });
  }, [setAllComments]);

  const date = dateFormat(article.created_at, "fullDate");

  return (
    <div className="articleByID">
      <div>
        <p className="topic">{article.topic}</p>
        <h1>{article.title}</h1>
        <>By {article.author}</>
        <p>{date}</p>
        <img src={article.article_img_url} />
      </div>

      <p className="articleBody">{article.body}</p>
      <div className="voteAndCommentBar">
        <div><img src="https://cdn-icons-png.flaticon.com/512/2722/2722994.png"/>{article.votes}</div>
        <div><img src="https://cdn.iconscout.com/icon/free/png-256/free-comment-2652894-2202811.png"/>{allComments.length}</div>
      </div>

      <CommentSection allComments={allComments} />
    </div>
  );
}

export default ArticleByID;
