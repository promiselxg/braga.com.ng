import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
// import { AuthContext } from "../../context/AuthContext";
import './login.css';

const Login = () => {
  const { loading, error, user, dispatch } = useContext(AuthContext);
  useEffect(() => {
    const verifyToken = () => {
      if (user) {
        window.location = '/';
      }
    };
    verifyToken();
  }, [user, dispatch]);

  const API_URL = 'https://api.braga.com.ng';
  const [credentials, setCredentials] = useState({
    Username: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post(`${API_URL}/api/v2/auth/login`, credentials);
      if (res.data.success) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.token });
        window.location = '/';
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: { message: `${error.message}` },
        });
      }
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
    }
  };

  return (
    <div className="formWrapper">
      <form action="">
        <div className="login">
          <div className="lContainer">
            <input
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleChange}
              className="lInput"
              autoComplete="username"
            />
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
              className="lInput"
              autoComplete="current-password"
            />
            <button
              disabled={loading}
              onClick={handleClick}
              className="lButton"
            >
              Login
            </button>
            {error && <span className="error">{error.message}</span>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
