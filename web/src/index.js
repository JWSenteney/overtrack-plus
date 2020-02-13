import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { LocalizeProvider } from "react-localize-redux";
import { ThemeProvider } from "@material-ui/core/styles";

import reducers from "./store";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import theme from "./themes/dark";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <LocalizeProvider>
        <App />
      </LocalizeProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
