import React, { useState } from "react";
import LoginForm from "./loginForm";
import Popup from "./popup";
import SignUpForm from "./signUpForm";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { userLogout } from "../redux/actions";
import { AppState } from "../redux/index";
import { actionTypes } from "../redux/types";



interface PropsFromDispatch {
  userLogout: () => void
}

interface StateFromDispatch {
  user: any
}


type AllProps =  PropsFromDispatch & StateFromDispatch;

const Header: React.FC<AllProps> = ({user, userLogout}) => {

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
    setloginSuccessful(true);
    setTimeout(() => {
      setloginSuccessful(false);
    }, 1000);
  };
  function handleSuccessfulsignup() {
    setsignUpSuccessful(true);
    setTimeout(() => {
      setsignUpSuccessful(false);
    }, 1000);
  }
  function handleLogoutClick() {
    userLogout();
    setLogoutForm(true);
    setTimeout(() => {
      setLogoutForm(false);
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


const mapDispatchToProps = (dispatch: Dispatch<actionTypes>) => {
  return {
    userLogout: () => dispatch(userLogout())
  };
};

const mapStateToProps = (state: AppState) => {
  return {
    user: state.user 
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);


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

