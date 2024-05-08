import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { loginUser, getUsers } from "../api";
import { useContext, useState } from 'react'

import { LoginContext } from '../contexts/LoginContext';

function Login(){

    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const {user, setUser, token, setToken} = useContext(LoginContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        getUsers().then((usersData) => {
          const foundUser = usersData.find(
            (userData) => userData.username === user
          );
    
          if (foundUser) {
            loginUser({ user }).then((token) => {
              setToken(token);
              navigate(-1);
            });
          } else {
            setMessage("Username not found. Please register.");
          }
        });
      };

return(
    <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="validUser">username:</label>
                <input
                placeholder="username"
                    id="validUse"
                    type="text"
                    onChange={(event) => {setUser(event.target.value); setMessage("")}}
                    value={user}
                />
                <p><button type="submit">Login</button></p>
            </form>
            {message && <p>{message}</p>}
    </div>
)
}

Login.propTypes = {
    setToken: PropTypes.func
  }

export default Login;