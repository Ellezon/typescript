import React from "react";
import Home from "./components/home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./styles/css/main.css";
import { configureStore } from "./redux/index";
import { Provider } from "react-redux";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
