import { Link } from "react-router-dom";

function NewestArticle({ article }) {

  const date = new Date(article.created_at).toDateString().split(' ');
  const formattedDate = `${date[1]} ${date[2]}, ${date[3]}`;

  return (
    <div className="newestArticle">
      <div className="newestArticleData">
        <p className="topic">
        FRESH OFF THE PRESSES
        </p>
        <div>{formattedDate}</div>
        <Link to={`/article/${article.article_id}`}><h1>{article.title}</h1></Link>
        <p>By {article.author}</p>
      </div>
      <img src={article.article_img_url} />
    </div>
  );
}

export default NewestArticle;
