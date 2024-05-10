import {  useContext } from "react";
import { Link } from "react-router-dom";

import { LoginContext } from "../contexts/LoginContext";
import { ThemeContext } from '../contexts/ThemeContext';

function HeaderBar() {
  const { loggedUser, token,} = useContext(LoginContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme((currTheme) => {
      return currTheme === 'light' ? 'dark' : 'light';
    });
  };

  return (
    <div className="headerBar">
      <div className="headerSpaceHolder">
        {token ? (
          <div>
            <img src={loggedUser.avatar_url} />
            <span>{loggedUser.name.split(" ")[0]}</span>
          </div>
        ) : (
          <img src="https://i.ibb.co/dPqWWSm/favicon-32x32.png" />
        )}
      </div>

      <Link to="/" className="headerTitle">
        <span className="titleThe">T h e</span>
        <br />
        <span className="titlePuffinRoom">Puffin Room</span>
      </Link>

      <div className="headerTools">
      <img onClick={toggleTheme} src="https://cdn3.iconfinder.com/data/icons/meteocons/512/sun-symbol-512.png"/>
        {token ? (
          <Link to="/" className="loginButton">
            Write
          </Link>
        ) : (
          <Link to="/login" className="loginButton">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default HeaderBar;
