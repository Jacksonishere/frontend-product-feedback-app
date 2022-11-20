import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";

import { useSignUpUserMutation } from "../../api/userApiSlice";
import { setUser } from "../../features/users/UserSlice";
import useFlash from "../../hooks/useFlash";

import InputErrorMsg from "../utils/InputErrorMsg";
import Spinner from "../utils/Spinner";
import { ValidateEmail } from "../../utils/Utils";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [signUp, { isLoading }] = useSignUpUserMutation();
  const [avatarUrl] = useOutletContext();
  const { dispatchHideFlash } = useFlash();

  const [fullNameErrorMsg, setFullNameErrorMsg] = useState();
  const [usernameErrorMsg, setUsernameErrorMsg] = useState();
  const [emailErrorMsg, setEmailErrorMsg] = useState();
  const [passwordErrorMsg, setPasswordErrorMsg] = useState();

  const handleEmail = (e) => {
    if (!ValidateEmail(e.target.value)) {
      setEmailErrorMsg("Invalid email address.");
    } else {
      setEmailErrorMsg(null);
    }
  };

  const isInvalidForm = useMemo(
    () =>
      emailErrorMsg !== null ||
      usernameErrorMsg !== null ||
      passwordErrorMsg !== null,
    [emailErrorMsg, usernameErrorMsg, passwordErrorMsg]
  );

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formBody = Object.fromEntries(formData);
    formBody["avatar_url"] = avatarUrl;

    if (isInvalidForm) return;

    const { data: user, error } = await signUp(formBody);
    if (user) {
      dispatch(setUser(user));
      dispatchHideFlash();
      if (location.state?.from?.pathname) {
        navigate(location.state.from.pathname, { replace: true });
      } else {
        navigate("/", {
          state: { redirect: "SIGNUP", username: user.username },
          replace: true,
        });
      }
    } else if (error) {
      const errorMsgs = error.data.msg.split("and");
      errorMsgs.forEach((errorMsg) => {
        if (errorMsg.split(" ")[0].toLowerCase() === "username") {
          setUsernameErrorMsg(errorMsg);
        } else if (errorMsg.split(" ")[0].toLowerCase() === "email") {
          setEmailErrorMsg(errorMsg);
        }
      });
    }
  };

  return (
    <form className="form" action="#" onSubmit={handleSignup}>
      <div className="form-group">
        <label className="input-label" htmlFor="username">
          Username
        </label>
        <input
          className={`input-text ${usernameErrorMsg ? "error-input" : ""}`}
          onChange={(e) =>
            e.target.value === ""
              ? setUsernameErrorMsg("Username cannot be blank")
              : setUsernameErrorMsg(null)
          }
          name="username"
          type="text"
          placeholder="johndoe123"
        />
        <InputErrorMsg msg={usernameErrorMsg} />
      </div>

      <div className="form-group">
        <label className="input-label" htmlFor="full_name">
          Full Name
        </label>
        <input
          className={`input-text ${fullNameErrorMsg ? "error-input" : ""}`}
          onChange={(e) =>
            e.target.value === ""
              ? setFullNameErrorMsg("Please enter your full name")
              : setFullNameErrorMsg(null)
          }
          name="full_name"
          type="text"
          placeholder="johndoe123"
        />
        <InputErrorMsg msg={usernameErrorMsg} />
      </div>

      <div className="form-group">
        <label className="input-label" htmlFor="email">
          Email
        </label>
        <input
          className={`input-text ${emailErrorMsg ? "error-input" : ""}`}
          onChange={handleEmail}
          name="email"
          type="email"
          placeholder="johndoe@email.com"
        />
        <InputErrorMsg msg={emailErrorMsg} />
      </div>

      <div className="form-group">
        <label className="input-label" htmlFor="password">
          Password
        </label>
        <input
          className={`input-text ${passwordErrorMsg ? "error-input" : ""}`}
          onChange={(e) =>
            e.target.value.length < 8
              ? setPasswordErrorMsg(
                  "Password must be at least 8 characters long"
                )
              : setPasswordErrorMsg(null)
          }
          name="password"
          type="password"
          placeholder="johndoe@email.com"
        />
        <InputErrorMsg msg={passwordErrorMsg} />
      </div>

      <button className="form-submit w-full" type="submit">
        {isLoading ? <Spinner /> : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUpForm;
