import React, { Component } from 'react';
import axios from 'axios';
class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsible=this.onChangeTodoResponsible.bind(this);
    this.onChangeCompleted=this.onChangeCompleted.bind(this);
    this.onChangeTodoPriority=this.onChangeTodoPriority.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.state = {
      todo_description: '',
      todo_responsible: '',
      todo_priority: '',
      todo_completed: false,
    }
  }
  componentDidMount() {
    axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
      .then(res => {
        this.setState(
          {
            todo_description: res.data.todo_description,
            todo_responsible: res.data.todo_responsible,
            todo_priority: res.data.todo_responsible,
            todo_completed: res.data.todo_completed,


          }
        )
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  onChangeTodoDescription(e){
    this.setState(
      {
        todo_description : e.target.value
      }
    );
  }
  onChangeTodoResponsible(e){
    this.setState({
      todo_responsible : e.target.value
    })
  }
  onChangeTodoPriority(e){
    this.setState({
      todo_priority : e.target.value
    })
  }
  onChangeCompleted(e){
    this.setState({
      todo_completed : !this.state.todo_completed
    });
  }
  onSubmit(e){
    e.preventDefault();
    const obj = {
      todo_description :this.state.todo_description,
      todo_responsible : this.state.todo_responsible,
      todo_priority : this.state.todo_priority,
      todo_completed : this.state.todo_completed,
    };
    axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id,obj)
    .then(res=>{
      console.log(res.data)
    })
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <h3>Update Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form group">
            <label>Description : </label>
            <input type=" text"
              className="form-control"
              value={this.state.todo_description}
              onChange={this.onChangeTodoDescription}
            />
            <label>Responsible : </label>
            <input type="text"
              className="form-control"
              value={this.state.todo_responsible}
              onChange={this.onChangeTodoResponsible} />

          </div>
        </form>
      </div>
    );
  }
}

export default EditTodo

// import React from 'react';

// const EditTodo = ({ match }) => {
//   return (
//     <div>
//       <h3>ID:  {match.params.id}</h3>edit  </div>
//   );
// }

// export default EditTodo;