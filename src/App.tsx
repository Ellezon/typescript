import React from "react";
import Home from "./components/home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./styles/css/main.css";
function App () {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </BrowserRouter>
    );
}

export default App;
