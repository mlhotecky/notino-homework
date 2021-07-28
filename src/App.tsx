import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import TodoList from "./TodoList";
import TodoDetail from "./TodoDetail";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/todos/:id" component={TodoDetail} />
        <Route path="/todos" component={TodoList} />
        <Route exact path="/">
          <Redirect to="/todos" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
