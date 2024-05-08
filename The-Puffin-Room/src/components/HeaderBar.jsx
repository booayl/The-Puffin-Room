import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { getLoginUserData } from "../api";
import { LoginContext } from "../contexts/LoginContext";

function HeaderBar() {
  const { user, setUser, token, setToken } = useContext(LoginContext);
  const [loginUser, setLoginUser] = useState({});

  useEffect(() => {
    getLoginUserData(user).then((userData) => {
      setLoginUser(userData);
    });
  }, [user, setLoginUser]);

  return (
    <div className="headerBar">
      <div className="headerSpaceHolder">
        {token ? (
          <div>
            <img src={loginUser.avatar_url} />
            <span>{loginUser.name.split(" ")[0]}</span>
          </div>
        ) : (
          <img src="../Favicon/favicon-32x32.png" />
        )}
      </div>

      <Link to="/" className="headerTitle">
        <span className="titleThe">T h e</span>
        <br />
        <span className="titlePuffinRoom">Puffin Room</span>
      </Link>

      <div className="headerTools">
        {token ? (
          <Link to="/" className="loginButton">
            Write
          </Link>
        ) : (
          <Link to="/Login" className="loginButton">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default HeaderBar;
