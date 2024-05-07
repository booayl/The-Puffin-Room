import { getAricleByID } from "../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import CommentSection from "./5.CommentSection";
import { getCommentsByArticleID } from "../api";
import ArticleVotes from "./7.ArticleVotes";
import Loading from "./0.Loading.jsx";

function ArticleByID() {
  const [article, setArticle] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const { article_id } = useParams();

  useEffect(() => {
    getAricleByID(article_id).then((articleData) => {
      setArticle(articleData);
      setIsLoading(false);
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
            <div>
              <ArticleVotes articleVotes={article.votes} />
            </div>
            <div>
              <img src="https://i.ibb.co/xXxtHcg/comments.png" />
              {allComments.length}
            </div>
          </div>

          <CommentSection allComments={allComments} />
        </>
      )}
    </div>
  );
}

export default ArticleByID;
