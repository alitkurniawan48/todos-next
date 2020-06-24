import React from 'react';
import Api from '../helpers/api';

export default class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      completedTodos: [],
      inputValue: '',
      editedIndex: null,
      editedValue: '',
    }
  }

  async fetchTodos() {
    const response = await Api.get('todos');
    const { data } = response;
    const todos = [];
    const completedTodos = [];

    data.forEach(item => {
        if (item.completed) {
          completedTodos.push(item)
        } else {
          todos.push(item)
        }
    });

    this.setState({
      todos,
      completedTodos,
    });
  }

  async postTodos(title) {
    const response = await Api.post('todos', {
      title,
    });
    return response
  }

  async deleteTodos(id) {
    const response = await Api.delete(`todos/${id}`);
    return response
  }

  async updateTodos({ id, title, completed }) {
    const response = await Api.put(`todos/${id}`, {
      title,
      completed
    });
    return response
  }

  async handleAddTodos() {
    const { inputValue } = this.state;
    await this.postTodos(inputValue);
    await this.fetchTodos();
    this.setState({ inputValue: '' })
  }

  async handleDeleteTodos(id) {
    await this.deleteTodos(id);
    await this.fetchTodos();
  }

  handleEditedTodos({ editedIndex, editedValue }) {
    this.setState({
      editedIndex,
      editedValue,
    })
  }

  async handleDoneTodos({ id, title }) {
    await this.updateTodos({
      id,
      title,
      completed: true,
    });
    await this.fetchTodos()
  }

  async onSubmitEdited(id) {
    const { editedValue } = this.state;
    await this.updateTodos({
      id,
      title: editedValue,
    });
    await this.fetchTodos()
    this.setState({
      editedIndex: null,
      editedValue: '',
    })
  }

  onInputValueChange(event) {
    this.setState({
      inputValue: event.target.value
    })
  }

  onEditedValueChange(event) {
    this.setState({
      editedValue: event.target.value
    })
  }

  componentDidMount() {
    this.fetchTodos();
  }

  render() {
    const { todos, inputValue, editedIndex, editedValue, completedTodos } = this.state;
    return (
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <div className="flex-1" style={{ minWidth: 800 }}>

          <div class="input-group mb-4 mt-3">
            <div class="input-group-prepend">
              <button onClick={this.handleAddTodos.bind(this)} class="btn btn-outline-primary" type="submit">+</button>
            </div>
            <input type="text" class="form-control" placeholder="Add Todos" aria-label="addTodos" aria-describedby="basic-addon1" value={inputValue} onInput={this.onInputValueChange.bind(this)} />
          </div>

           {
            todos.length !== 0 && (
              <div>
                <h5 class="card-title">Todos</h5>
                <div className="d-flex">
                  <div className="card flex-1 w-100">
                    <ul ref="form" className="list-group list-group-flush">
                      {Array.isArray(todos) && (
                        todos.map(({ title = '', id } = {}, index) => {
                          return (
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              {
                                editedIndex === index ? (
                                  <input type="text" class="form-control" placeholder="Edit Todos" aria-label="addTodos" aria-describedby="basic-addon1" value={editedValue} onInput={this.onEditedValueChange.bind(this)} />
                                ) : (
                                  <span>{title}</span>
                                )
                              }
                              <td style={{ whiteSpace: 'nowrap' }} className="ml-3" >
                                {
                                  editedIndex === index ? (
                                    <button onClick={this.onSubmitEdited.bind(this, id)} type="button" class="btn btn-primary mr-3">Save</button>
                                  ) : (
                                    <button onClick={this.handleEditedTodos.bind(this, { editedIndex: index, editedValue: title  })} type="button" class="btn btn-light mr-3">Edit</button>
                                  )
                                }
                                <button onClick={this.handleDeleteTodos.bind(this, id)} type="button" class="btn btn-danger mr-3">Delete</button>
                                <button onClick={this.handleDoneTodos.bind(this, { id, title })} type="button" class="btn btn-success">Done</button>
                              </td>
                            </li>
                          );
                        })
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )
          }



          {
            completedTodos.length !== 0 && (
              <div className="mt-3">
                <h5 class="card-title">Completed Todos</h5>
                <div className="d-flex">
                  <div className="card flex-1 w-100">
                    <ul ref="form" className="list-group list-group-flush">
                      {Array.isArray(todos) && (
                        completedTodos.map(({ title = '', id } = {}, index) => {
                          return (
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              {
                                editedIndex === index ? (
                                  <input type="text" class="form-control" placeholder="Edit Todos" aria-label="addTodos" aria-describedby="basic-addon1" value={editedValue} onInput={this.onEditedValueChange.bind(this)} />
                                ) : (
                                  <span>{title}</span>
                                )
                              }
                              <td style={{ whiteSpace: 'nowrap' }} className="ml-3" >
                                <button onClick={this.handleDeleteTodos.bind(this, id)} type="button" class="btn btn-danger">Delete</button>
                              </td>
                            </li>
                          );
                        })
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )
          }
          
        </div>
      </div>
    )
  }
}