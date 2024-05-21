import { postArticle, getTopics, postTopic } from "../api";
import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../contexts/LoginContext";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";
import { RenderContext } from "../contexts/RenderContext";

function PostArticle() {
  const { loggedUser, token } = useContext(LoginContext);
  const [newArticle, setNewArticle] = useState({
    author: loggedUser.username,
    title: "",
    body: "",
    topic: "",
    article_img_url: "",
  });
  const [topicList, setTopicList] = useState([]);
  const [newTopic, setNewTopic] = useState({ slug: "", description: "" });
  const [errorData, setErrorData] = useState({ status: "", message: "" });

  const navigate = useNavigate();
  const { setRender } = useContext(RenderContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    const postNewArticle = (articleData) => {
      postArticle(articleData)
        .then((postedArticle) => {
          setNewArticle({
            author: loggedUser.username,
            title: "",
            body: "",
            topic: "",
            article_img_url: "",
          });
          setNewTopic({ slug: "", description: "" });
          navigate(`/article/${postedArticle.article_id}`);
        })
        .catch((error) => {
          setErrorData({
            status: error.status,
            message: error.message,
          });
        });
    };

    if (newTopic.slug && newTopic.description) {
      postTopic(newTopic)
        .then((createdTopic) => {
          const updatedArticle = {
            ...newArticle,
            topic: createdTopic.slug,
          };
          setRender((prev) => !prev);
          postNewArticle(updatedArticle);
        })
        .catch((error) => {
          setErrorData({
            status: error.status,
            message: error.message,
          });
        });
    } else {
      postNewArticle(newArticle);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "newTopicSlug" || name === "newTopicDescription") {
      setNewTopic((prevTopic) => ({
        ...prevTopic,
        [name === "newTopicSlug" ? "slug" : "description"]: value,
      }));
    } else {
      setNewArticle((prevArticle) => ({
        ...prevArticle,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    getTopics().then((topics) => {
      setTopicList(topics);
    });
  }, []);

  const isFormValid = newArticle.title.length > 0 && newArticle.body.length > 0;
  const isExistingTopicSelected = topicList.some(
    (topic) => topic.slug === newArticle.topic
  );

  if (!token) {
    return <Login />;
  }

  return (
    <div className="postArticle">
      <iframe src="https://lottie.host/embed/e284fc64-20cb-4d62-982e-053019b0b73d/UgvTahHCfo.json"></iframe>
      <form onSubmit={handleSubmit}>
        <div className="postForm">
          <h1>Publish A Post ✨</h1>
          <h2>Is this the next Talk Of The Town?</h2>
          <div>
            <label htmlFor="title">
              <p>Title</p>
            </label>
            <input
              name="title"
              placeholder="Title"
              id="title"
              type="text"
              onChange={handleChange}
              value={newArticle.title}
            />
          </div>

          <div>
            <label htmlFor="body">
              <p>Post</p>
            </label>
            <textarea
              name="body"
              placeholder="Type post here"
              id="body"
              type="text"
              onChange={handleChange}
              value={newArticle.body}
            />
          </div>

          <div>
            <label>
              <p>Topic</p>
            </label>
            <div className="topicRadio">
              {topicList.map((topic) => (
                <div key={topic.slug}>
                  <input
                    name="topic"
                    id={`topic-${topic.slug}`}
                    type="radio"
                    onChange={handleChange}
                    value={topic.slug}
                    checked={newArticle.topic === topic.slug}
                  />
                  <label htmlFor={`topic-${topic.slug}`}>
                    {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                  </label>
                </div>
              ))}
            </div>
            <input
              className="newTopicRadio"
              name="topic"
              id="newTopic"
              type="radio"
              onChange={() => {
                setNewArticle((prevArticle) => ({
                  ...prevArticle,
                  topic: "new",
                }));
              }}
              value="new"
              checked={newArticle.topic === "new"}
            />
            <label htmlFor="newTopic">Add new topic:</label>{" "}
            <div className="newTopicInput">
              <input
                name="newTopicSlug"
                placeholder="Topic Name"
                type="text"
                onChange={handleChange}
                value={newTopic.slug}
                disabled={isExistingTopicSelected}
              />
              <textarea
                name="newTopicDescription"
                placeholder="Topic Description"
                type="text"
                onChange={handleChange}
                value={newTopic.description}
                disabled={isExistingTopicSelected}
              />
            </div>
          </div>

          <div>
            <label htmlFor="article_img_url">
              <p>Image Url</p>
            </label>
            <input
              name="article_img_url"
              placeholder="Image Url"
              id="article_img_url"
              type="text"
              onChange={handleChange}
              value={newArticle.article_img_url}
            />
          </div>
          <button type="submit" disabled={!isFormValid}>
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostArticle;
