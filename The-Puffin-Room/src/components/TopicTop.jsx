import { Link } from "react-router-dom";

function TopicTop({ article }) {

  const date = new Date(article.created_at).toDateString().split(' ');
  const formattedDate = `${date[1]} ${date[2]}, ${date[3]}`;

  return (
    <div className="topicTop">
      <img src={article.article_img_url} />
      <div className="topicTopData">
        <p className="topic">
        {article.topic}
        </p>
        <div>{formattedDate}</div>
        <Link to={`/article/${article.article_id}`}><h1>{article.title}</h1></Link>
        <p>By {article.author}</p>
      </div>
    </div>
  );
}

export default TopicTop;
