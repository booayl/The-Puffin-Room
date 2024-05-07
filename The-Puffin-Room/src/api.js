import axios from "axios";

export function getArticleList(page){
    return axios.get(`https://news-app-u364.onrender.com/api/articles?p=${page}`)
    .then((res)=>{
        return res.data.allArticles
    })
    .catch((error)=>{
        console.log(error)
    })
}