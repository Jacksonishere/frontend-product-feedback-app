import React, { useCallback } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { loadedSelector } from "../../features/users/userSlice";
import useAuth from "../../hooks/useAuth";

import LoginIcon from "../../icons/Login";

const LoginPanel = ({ hamOpen, setHamOpen }) => {
  const user = useAuth();
  const loaded = useSelector(loadedSelector);

  const toggleHam = useCallback(() => setHamOpen((curr) => !curr), []);

  return (
    <div className="fixed inset-x-0 top-0 flex items-center px-6 h-[72px] bg-gradient text-white md:static md:flex-col md:h-auto md:w-1/3 md:rounded-lg md:items-start md:p-6">
      <div className="flex flex-col capitalize md:order-2 md:mt-auto">
        <h2 className="font-bold text-[15px] md:text-[20px]">
          Frontend Mentor
        </h2>
        <p className="text-[13px] opacity-75 md:text-[15px]">Feedback Board</p>
      </div>

      <div className="text-[16px] ml-auto md:order-1 md:ml-0">
        {loaded && (
          <>
            {user ? (
              <div className="flex justify-start items-center">
                <figure>
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.avatar_url}
                    alt=""
                  />
                </figure>
                <p className="hidden md:block">
                  <b>{user.username}</b>
                </p>
              </div>
            ) : (
              <Link className="flex" to="/auth/login">
                <LoginIcon />
                <span className="ml-[3px]">Login</span>
              </Link>
            )}
          </>
        )}
      </div>

      <div
        onClick={toggleHam}
        className="flex flex-col space-y-1 ml-5 md:hidden"
      >
        <span
          className={`origin-left ham-bar ${hamOpen ? "rotate-45" : ""} `}
        ></span>
        <span className={`${hamOpen ? "opacity-0" : ""} ham-bar`}></span>
        <span
          className={`origin-left ham-bar ${hamOpen ? "-rotate-45" : ""} `}
        ></span>
      </div>
    </div>
  );
};

export default LoginPanel;
