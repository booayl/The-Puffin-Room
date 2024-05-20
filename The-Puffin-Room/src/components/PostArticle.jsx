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

  if (!token) {
    return <Login />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
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
          <label htmlFor="body">Post</label>
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
          <label>Topic</label>
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
          <div>
            <input
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
            <label htmlFor="newTopic">Add new topic:</label>
          </div>
          {newArticle.topic === "new" && (
            <div>
              <input
                name="newTopicSlug"
                placeholder="New topic slug"
                type="text"
                onChange={handleChange}
                value={newTopic.slug}
              />
              <textarea
                name="newTopicDescription"
                placeholder="New topic description"
                type="text"
                onChange={handleChange}
                value={newTopic.description}
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="article_img_url">Image Url</label>
          <input
            name="article_img_url"
            placeholder="Image Url"
            id="article_img_url"
            type="text"
            onChange={handleChange}
            value={newArticle.article_img_url}
          />
        </div>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

export default PostArticle;
