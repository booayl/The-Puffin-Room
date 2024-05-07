import { getAricleByID } from "../api"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";

function ArticleByID(){
    const [article,setArticle] = useState([])
    const {article_id} = useParams();

    useEffect(()=>{
        getAricleByID(article_id).then((articleData)=>{
            setArticle(articleData)
        })
    },[setArticle])

    const date = dateFormat(article.created_at,"fullDate")

    return (
        <div className="articleByID">
        <div>
            <p className="topic">{article.topic}</p>
            <h1>{article.title}</h1>
            <>By {article.author}</>
        <p>{date}</p>
        <img src={article.article_img_url}/>
        </div>

        <p className="articleBody">
        {article.body}
        </p>
        </div>

    )
}

export default ArticleByID