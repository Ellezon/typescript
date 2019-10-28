import React from "react";
import Header from "./header";
import Footer from "./footer";

function Error404() {
    return (
      <React.Fragment>
        <Header />
        <h1 className="col-12 title">404 - Page not found!</h1>
        <div className="container main-container">
          <div className="row justify-content-center">
            <span className="msg-404">Sorry this page does not exist!</span>
          </div>
        </div>
        <Footer/>
      </React.Fragment>
    );
  }


export default Error404;
