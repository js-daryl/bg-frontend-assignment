import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import AuthService from "../services/auth.service";

const Login = props => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeId = (e) => {
    const id = e.target.value;
    setId(id);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);
    AuthService.login(id, password).then(
      () => {
        props.history.push("/home");
      },
      (error) => {
        setLoading(false);
      }
    )
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin}>
          <div className="form-group">
            <Input
              type="text"
              className="form-control"
              placeholder="Colonist ID"
              name="id"
              value={id}
              onChange={onChangeId}
            />
          </div>

          <div className="form-group">
            <Input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

        </Form>
      </div>
    </div>
  );
};

export default Login;
