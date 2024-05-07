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

export function getAricleByID(articleID){
return axios.get(`https://news-app-u364.onrender.com/api/articles/${articleID}`)
.then((res)=>{
    return res.data.article
})
.catch((error)=>{
    console.log(error)
})
}