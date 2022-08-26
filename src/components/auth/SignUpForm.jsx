import React from "react";

const SignUpForm = () => {
  return (
    <form className="form" action="#">
      <label className="label-wrapper">
        <span className="input-label">Full Name</span>
        <input
          ref={(node) => node?.focus()}
          className="input-text"
          name="user[full_name]"
          type="text"
          placeholder="john doe"
        />
      </label>
      <label className="label-wrapper">
        <span className="input-label">Email</span>
        <input
          className="input-text"
          name="user[full_name]"
          type="text"
          placeholder="johndoe@gmail.com"
        />
      </label>
      <label className="label-wrapper">
        <span className="input-label">Password</span>
        <input className="input-text" name="user[password]" type="password" />
      </label>
      <button className="form-submit" type="submit">
        Login
      </button>
    </form>
  );
};

export default SignUpForm;
