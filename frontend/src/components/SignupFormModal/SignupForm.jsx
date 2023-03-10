import React, { useState } from "react";
import { useDispatch} from "react-redux";

import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const handleDemo =() => {
    dispatch(sessionActions.login({ credential:'Demo-lition', password:'password' }))
  }
  // if (sessionUser) return <Redirect to="/" />;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className='signup'>
    <form onSubmit={handleSubmit}>
     
      <ul>
        {errors.map(error => <li className='login-errors' key={error}>{error}</li>)}
      </ul>
      <h1>Join GreenFin</h1>
      <br />
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button className= 'form_button' type="submit">Sign Up</button>
    </form>
    <h3 id='or'>OR</h3>
      <button id='red-demo'  onClick={handleDemo}>Use Demo log in</button>
    </div>
  );
}

export default SignupForm;