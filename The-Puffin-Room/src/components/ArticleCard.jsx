import { Link } from "react-router-dom"
import dateFormat from "dateformat";

function ArticleCard({ article }) {

  const date = dateFormat(article.created_at,"mediumDate")

  return (
    <div className="articleCard">
      <img src={article.article_img_url} />
      <div>
        <p className="topic">{article.topic}</p>
        <h1>{article.title}</h1>
        <>By {article.author}</>
        <p>{date}</p>
        <Link to = {`/article/${article.article_id}`}>Read More</Link>
      </div>
    </div>
  );
}

export default ArticleCard;
