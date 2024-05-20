import { Link } from "react-router-dom";

function MostVotedArticle({ article }) {
  const date = new Date(article.created_at).toDateString().split(" ");
  const formattedDate = `${date[1]} ${date[2]}, ${date[3]}`;

  return (
    <div className="mostVotedArticleCard">
      <p className="topic">{(article.topic).charAt(0).toUpperCase() + (article.topic).slice(1)}</p>
      <img className="mostVotedArticleCardImg" src={article.article_img_url} />

      <div className="mostVotedArticleCardData">
      <p>{formattedDate}</p>
      <Link to={`/article/${article.article_id}`}>
        <h2>{article.title}</h2>
      </Link>
      <p className="author">By {article.author}</p>

      <img src="https://i.ibb.co/tHRcH6j/red-heart.png" />
      <span>{article.votes}</span>

      <img src="https://i.ibb.co/NTNVtdQ/Asset-4.png" />
        <span>{article.comment_count}</span></div>
    </div>
  );
}


export default MostVotedArticle;
