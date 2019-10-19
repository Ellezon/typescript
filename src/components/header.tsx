import React, { useState } from "react";
import LoginForm from "./loginForm";
import Popup from "./popup";
import SignUpForm from "./signUpForm";
import { Link } from "react-router-dom";

type HeaderProps = {
  user: Object,
}
const Header: React.FC<HeaderProps> = ({ user }) => {

  const [showLoginForm, setLoginForm] = useState(false);
  const [showLogoutForm, setLogoutForm] = useState(false);
  const [showSignUpForm, setSignUpForm] = useState(false);
  const [signUpSuccessful, setsignUpSuccessful] = useState(false);
  const [loginSuccessful, setloginSuccessful] = useState(false);

  function toggleLoginForm() {
    setLoginForm(!showLoginForm);
  };
  function toggleSignUpForm() {
    setSignUpForm(!showSignUpForm);
  };
  function handleSuccessfulLogin() {
    setloginSuccessful(!loginSuccessful);
    setTimeout(() => {
      setloginSuccessful(!loginSuccessful);
    }, 1000);
  };
  function handleSuccessfulsignup() {
    setsignUpSuccessful(!signUpSuccessful);
    setTimeout(() => {
      setsignUpSuccessful(!signUpSuccessful);
    }, 1000);
  }
  function handleLogoutClick() {
    //login user - save info to redux store
    //userLogout();
    setLogoutForm(!showLogoutForm);
    setTimeout(() => {
      setLogoutForm(!showLogoutForm);
    }, 1000);
  };

  return (
    <React.Fragment>
      <header>
        {user == null && (
          <React.Fragment>
            <HeaderButton
              text={"Sign Up"}
              classes={"primary-btn"}
              onClick={toggleSignUpForm}
            />
            <HeaderButton
              text={"Login"}
              classes={"secondary-btn"}
              onClick={toggleLoginForm}
            />
          </React.Fragment>
        )}
        {user != null && user.is_admin && window.location.pathname === '/' && (
          <Link to={"/admin"} className="secondary-btn">
            Admin Panel
            </Link>
        )}
        {user != null && window.location.pathname === '/admin' && (
          <Link to={"/"} className="secondary-btn">
            Home
            </Link>
        )}
        {user != null && (
          <HeaderButton
            text={"Log Out"}
            classes={"secondary-btn"}
            onClick={handleLogoutClick}
          />
        )}
      </header>
      {showLoginForm && (
        <LoginForm
          success={handleSuccessfulLogin}
          toggle={toggleLoginForm}
        />
      )}
      {loginSuccessful && <Popup msg="Logging in..." />}
      {showLogoutForm && <Popup msg="Logged out sucessfully!" />}
      {showSignUpForm && (
        <SignUpForm
          success={handleSuccessfulsignup}
          toggle={toggleSignUpForm}
        />
      )}
      {signUpSuccessful && (
        <Popup msg="Sign Up successful! Logging you in..." />
      )}
    </React.Fragment>
  );
}

export default Header;

type HeaderButtonProps = {
  classes: string,
  onClick: any,
  text: string
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({ classes, onClick, text }) => {
  return (
    <button className={classes} onClick={onClick}>
      {text}
    </button>
  );
}


