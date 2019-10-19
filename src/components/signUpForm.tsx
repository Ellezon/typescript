import React, {useState} from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
// import { connect } from "react-redux";
// import { userLogin } from "../redux/actions";

type SignUpFormProps = {
    success: any,
    toggle: any
}

const SignUpForm:React.FC<SignUpFormProps> = ({toggle, success}) =>  {
    
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    
    const validateForm = () => {
    return first_name.length >0 && last_name.length >0 && email.length > 0 && password.length > 0;
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
        type: "register",
        first_name: first_name,
        last_name: last_name,
        is_admin: false,
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
          //Register user - save info to redux store
        //   this.props.userLogin(data.user);
          //hide Sign up form
            toggle();
           //show 'SIgn up successful' popup
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
        <FormGroup controlId="first_name">
            <FormLabel>Name</FormLabel>
            <FormControl
              autoFocus
              type="text"
              value={first_name}
              onChange={(e: any) => setFirstName(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="last_name">
            <FormLabel>Surname</FormLabel>
            <FormControl
              type="text"
              value={last_name}
              onChange={(e: any) => setLastName(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="email">
            <FormLabel>Email</FormLabel>
            <FormControl
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
              Sign up!
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
// )(SignUpForm);
export default SignUpForm;
