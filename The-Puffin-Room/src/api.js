import axios from "axios";

export function getArticleList(page) {
  return axios
    .get(`https://news-app-u364.onrender.com/api/articles?p=${page}`)
    .then((res) => {
      return res.data.allArticles;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getAricleByID(articleID) {
  return axios
    .get(`https://news-app-u364.onrender.com/api/articles/${articleID}`)
    .then((res) => {
      return res.data.article;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getCommentsByArticleID(articleID) {
  return axios
    .get(
      `https://news-app-u364.onrender.com/api/articles/${articleID}/comments`
    )
    .then((res) => {
      return res.data.allComments;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function patchArticleVote(articleID, newVote) {
  return axios
    .patch(
      `https://news-app-u364.onrender.com/api/articles/${articleID}`,
      newVote
    )
    .then((response) => {
      console.log(response);
      return response;
    });
}

export function getUsers() {
  return axios
    .get(`https://news-app-u364.onrender.com/api/users`)
    .then((res) => {
      return res.data.users;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function loginUser(credentials) {
  return axios
    .post("http://localhost:8080/login", credentials)
    .then((response) => {
      return response.data.token;
    })
    .catch((error) => {
      console.error("Login failed:", error);
      throw error;
    });
}

export function getLoginUserData(username){
    return axios.get(`https://news-app-u364.onrender.com/api/users/${username}`)
    .then((res) => {
        return res.data.user;
      })
      .catch((error) => {
        console.log(error);
      });
}
