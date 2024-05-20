import { Link } from "react-router-dom";

function HighlightArticle({ article }) {

  const date = new Date(article.created_at).toDateString().split(' ');
  const formattedDate = `${date[1]} ${date[2]}, ${date[3]}`;

  return (
    <div className="highlightArticle">
      <img src={article.article_img_url} />
      <div>
        <p className="topic">
          TALK OF THE TOWN
        </p>
        <div>{formattedDate}</div>
        <Link to={`/article/${article.article_id}`}><h1>{article.title}</h1></Link>
        <p>By {article.author}</p>
        {/* <Link to={`/article/${article.article_id}`}>→</Link> */}
      </div>
    </div>
  );
}

export default HighlightArticle;
