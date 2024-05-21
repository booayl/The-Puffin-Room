import { Link } from "react-router-dom";

import { useContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { LoginContext } from "../contexts/LoginContext";
import { RenderContext } from "../contexts/RenderContext";
import { deleteArticle } from "../api";

function TopicTop({ article }) {
  const navigate = useNavigate();

  if(!article){
    navigate("/articles")
  }
  
  const date = new Date(article.created_at).toDateString().split(' ');
  const formattedDate = `${date[1]} ${date[2]}, ${date[3]}`;

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

  return (
    <div className="topicTop">
      <img src={article.article_img_url} />
      <div className="topicTopData">
      {article.author === loggedUser.username && !isDeleted && (
        <button className= "deleteButton" onClick={handleClick}>x</button>
      )}
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
