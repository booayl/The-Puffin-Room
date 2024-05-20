import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { LoginContext } from "../contexts/LoginContext";
import { ThemeContext } from "../contexts/ThemeContext";

function HeaderBar() {
  const { loggedUser, token } = useContext(LoginContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const [iconUrl, setIconUrl] = useState(
    "https://cdn3.iconfinder.com/data/icons/meteocons/512/sun-symbol-512.png"
  );

  const toggleTheme = () => {
    setTheme((currTheme) => {
      return currTheme === "light" ? "dark" : "light";
    });
    if (theme === "dark") {
      setIconUrl(
        "https://cdn3.iconfinder.com/data/icons/meteocons/512/sun-symbol-512.png"
      );
    } else {
      setIconUrl("https://static.vecteezy.com/system/resources/previews/019/899/719/original/simple-moon-icon-png.png");
    }
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
        <img onClick={toggleTheme} src={iconUrl} />
        {token ? (
          <Link to="/articles/create" className="loginButton">
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
