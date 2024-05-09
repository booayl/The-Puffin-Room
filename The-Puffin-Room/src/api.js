import axios from "axios";

export function getArticleList(params) {
  return axios
    .get(`https://news-app-u364.onrender.com/api/articles`, {
      params: params,
    })
    .then((res) => {
      return res.data.allArticles;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export function getAricleByID(articleID) {
  return axios
    .get(`https://news-app-u364.onrender.com/api/articles/${articleID}`)
    .then((res) => {
      return res.data.article;
    })
    .catch((error) => {
      throw error;
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
      throw error;
    });
}

export function patchArticleVote(articleID, newVote) {
  return axios
    .patch(
      `https://news-app-u364.onrender.com/api/articles/${articleID}`,
      newVote
    )
    .then((response) => {
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
      throw error;
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

export function getLoginUserData(username) {
  return axios
    .get(`https://news-app-u364.onrender.com/api/users/${username}`)
    .then((res) => {
      return res.data.user;
    })
    .catch((error) => {
      throw error;
    });
}

export function postComment(articleID, newComment) {
  return axios
    .post(
      `https://news-app-u364.onrender.com/api/articles/${articleID}/comments`,
      newComment
    )
    .then((response) => {
      return response.data.postedComment;
    })
    .catch((error) => {
      throw error;
    });
}

export function deleteComment(commentID) {
  return axios
    .delete(`https://news-app-u364.onrender.com/api/comments/${commentID}`)
    .then((res) => {
      console.log(res);
    });
}

export function getTopics() {
  return axios
    .get(`https://news-app-u364.onrender.com/api/topics`)
    .then((res) => {
      return res.data.topics;
    })
    .catch((error) => {
      throw error;
    });
}
