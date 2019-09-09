import React, { Component } from 'react';
import { BrowserRouter as Router, Route ,Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TodosList from './components/todos-list.component';
import EditTodo from './components/edit-todo.component';
import CreateTodo from './components/create-todo.component';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <Router>
        <div className="container">
        <ul>
          <li>
            <Link to="/">TodosList</Link>
          </li>
          <li>
            <Link to="/edit">Edit</Link>
          </li>
          <li>
            <Link to="/Create">Create</Link>
          </li>
        </ul>

        <hr />
        <Route exact path="/" component={TodosList} />
        <Route path="/edit:id" component={EditTodo} />
        <Route path="/Create" component={CreateTodo} />
        </div>
      </Router>
     
    )
  }
}

export default App;