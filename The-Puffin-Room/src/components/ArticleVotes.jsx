import { patchArticleVote } from "../api"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorBox from "./ErrorBox.jsx";

function ArticleVotes({articleVotes}){
    const { article_id } = useParams();

    const [votes,setVotes] = useState(articleVotes)
    const [clickedOnce, setClickedOnce] = useState(false);
    const [iconUrl, setIconUrl] = useState("https://i.ibb.co/qRdf45b/white-heart.png");
    const [errorData, setErrorData] = useState({ status: 0, message: "" });

    useEffect(() => {
        setVotes(articleVotes);
    }, [articleVotes]);

    const handleVote = () =>{
        setVotes(votes + 1)
        patchArticleVote(article_id,{inc_votes : 1 })
        .catch((error) => {
            setErrorData({
              ...errorData,
              status: error.status,
              message: error.message,
            });
          });
    }

    const cancelVote = () =>{
        setVotes(votes - 1)
        patchArticleVote(article_id,{inc_votes : -1 })
    }
    const handleClick = () => {
        if (!clickedOnce) {
            handleVote();
            setIconUrl("https://i.ibb.co/tHRcH6j/red-heart.png");
            setClickedOnce(true);
        } else {
            cancelVote();
            setIconUrl("https://i.ibb.co/qRdf45b/white-heart.png");
            setClickedOnce(false);
        }
    };

    const displayVotes = Math.max(articleVotes,(votes||0))

    if (errorData.status !== 0) {
        return <ErrorBox status={errorData.status} message={errorData.message} />;
      }
      
    return (
        <div>
            <img src={iconUrl} onClick={handleClick} />
            <span>{displayVotes}</span>
        </div>
    )
}

export default ArticleVotes