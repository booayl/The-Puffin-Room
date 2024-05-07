function ArticleCard({ article }) {
  return (
    <div className="articleCard">
      <img src={article.article_img_url} />
      <div>
        <p className="topic">{article.topic}</p>
        <h1>{article.title}</h1>
        <p>By {article.author}</p>
      </div>
    </div>
  );
}

export default ArticleCard;
