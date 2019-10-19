import React, {useState} from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
// import { connect } from "react-redux";
// import { userLogin } from "../redux/actions";
type LoginFormProps = {
    success: any,
    toggle: any
}
const LoginForm : React.FC<LoginFormProps> = ({success, toggle}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);


  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    fetch("/users/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "login",
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
            setError(data.error);
          setTimeout(() => {
            setError(false);
          }, 1000);
        } else {
         // login user - save info to redux store
        //  userLogin(data.user);
          //hide login form
            toggle();
          //show 'logging in' pop up
          success();
        }
      })
      .catch(error =>
        setError(error)
      );
  };

  const overlayClick = (e: any) => {
    e.stopPropagation();
    if (e.target.className === "overlay") {
        toggle();
    }
  };

    return (
      <div
        className="overlay"
        onClick={e => {
          overlayClick(e);
        }}
      >
        <form className="popup" onSubmit={handleSubmit}>
          <FormGroup controlId="email">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              type="password"
            />
          </FormGroup>
          {validateForm() && (
            <Button
              className="secondary-btn"
              block
              type="submit"
              onSubmit={handleSubmit}
            >
              Login
            </Button>
          )}
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    );
  
}
// const mapDispatchToProps = {
//   userLogin
// };

// export default connect(
//   null,
//   mapDispatchToProps
// )(LoginForm);
export default LoginForm;
