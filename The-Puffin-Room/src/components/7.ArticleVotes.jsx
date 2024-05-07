import { patchArticleVote } from "../api"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ArticleVotes({articleVotes}){
    const { article_id } = useParams();

    const [votes,setVotes] = useState(articleVotes)
    const [clickedOnce, setClickedOnce] = useState(false);
    const [iconUrl, setIconUrl] = useState("https://i.ibb.co/7Wvj2Pm/votes.png");

    useEffect(() => {
        setVotes(articleVotes);
    }, [articleVotes]);

    const handleVote = () =>{
        setVotes(votes + 1)
        patchArticleVote(article_id,{inc_votes : 1 })
    }

    const cancelVote = () =>{
        setVotes(votes - 1)
        patchArticleVote(article_id,{inc_votes : -1 })
    }
    const handleClick = () => {
        if (!clickedOnce) {
            handleVote();
            setIconUrl("https://i.ibb.co/j3qPXDg/upvote.png");
            setClickedOnce(true);
        } else {
            cancelVote();
            setIconUrl("https://i.ibb.co/7Wvj2Pm/votes.png");
            setClickedOnce(false);
        }
    };

    const displayVotes = Math.max(articleVotes,(votes||0))

    return (
        <div>
            <img src={iconUrl} onClick={handleClick} />
            <span>{displayVotes}</span>
        </div>
    )
}

export default ArticleVotes