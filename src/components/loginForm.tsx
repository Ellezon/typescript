import React, {useState} from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
// import { connect } from "react-redux";
// import { userLogin } from "../redux/actions";
type LoginFormProps = {

}
const LoginForm : React.FC<LoginFormProps> = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);


  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }

  const handleChange = (event: any) => {
    // this.setState({
    //   [event.target.id]: event.target.value
    // });
  };

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
          //login user - save info to redux store
        //   this.props.userLogin(data.user);
        //   //hide login form
        //   this.props.toggle();
        //   //show 'logging in' pop up
        //   this.props.success();
        }
      })
      .catch(error =>
        setError(error)
      );
  };

  const overlayClick = (e: any) => {
    e.stopPropagation();
    if (e.target.className === "overlay") {
    //   this.props.toggle();
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
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={password}
              onChange={handleChange}
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
