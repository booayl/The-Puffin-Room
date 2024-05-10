import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { loginUser, getUsers, getLoginUserData } from "../api";
import { useContext, useState } from "react";
import ErrorBox from "./ErrorBox.jsx";

import { LoginContext } from "../contexts/LoginContext";

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const { loggedUser, setloggedUser, setToken } = useContext(LoginContext);
  const [errorData, setErrorData] = useState({ status: 0, message: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    getUsers()
      .then((usersData) => {
        const foundUser = usersData.find(
          (userData) => userData.username === user
        );

        if (foundUser) {
          getLoginUserData(user).then((loggedUserData) => {
            setloggedUser({ ...loggedUser, ...loggedUserData });

            loginUser({ user }).then((token) => {
              setToken(token);
              navigate(-1);
            });
          });
        } else {
          setMessage("Username not found. Please register.");
        }
      })
      .catch((error) => {
        setErrorData({
          ...errorData,
          status: error.status,
          message: error.message,
        });
      });
  };

  return (
    <div>
      <h1>Login</h1>
      {errorData.status === 0 ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="validUser">username:</label>
            <input
              placeholder="username"
              id="validUse"
              type="text"
              onChange={(event) => {
                setUser(event.target.value);
                setMessage("");
              }}
              value={user}
            />
            <p>
              <button type="submit">Login</button>
            </p>
          </form>
          {message && <p className="alertBoxRed">{message}</p>}
        </div>
      ) : (
        <ErrorBox status={errorData.status} message={errorData.message} />
      )}
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func,
};

export default Login;
