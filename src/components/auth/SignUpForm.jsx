import React from "react";

import { useOutletContext } from "react-router-dom";
import { useSignUpUserMutation } from "../../api/userAuth";

const SignUpForm = () => {
  const [signUp, { data, isLoading, error, isSuccess }] =
    useSignUpUserMutation();
  const [avatarUrl] = useOutletContext();

  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formBody = Object.fromEntries(formData);
    formBody["avatar_url"] = avatarUrl;

    signUp(formBody);
  };

  return (
    <form className="form" action="#" onSubmit={handleSignup}>
      <label className="label-wrapper">
        <span className="input-label">Username</span>
        <input
          ref={(node) => node?.focus()}
          className="input-text"
          name="username"
          type="text"
          placeholder="johndoe123"
        />
      </label>
      <label className="label-wrapper">
        <span className="input-label">Email</span>
        <input
          className="input-text"
          name="email"
          type="text"
          placeholder="johndoe@gmail.com"
        />
      </label>
      <label className="label-wrapper">
        <span className="input-label">Password</span>
        <input className="input-text" name="password" type="password" />
      </label>
      <button className="form-submit" type="submit">
        Login
      </button>
    </form>
  );
};

export default SignUpForm;
