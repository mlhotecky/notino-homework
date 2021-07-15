import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import TodoList from './TodoList';
import TodoDetail from "./TodoDetail";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={TodoList} />
                <Route path="/:id" component={TodoDetail} />
            </Switch>
        </Router>
    );
}

export default App;