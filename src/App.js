import React, { PureComponent } from 'react';

import './App.css';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.toggleStrikeClass = this.toggleStrikeClass.bind(this);
  }

  propTypes: {
    placeholderText: React.PropTypes.String
  }

  state = {
    inputValue: '',
    placeholderText: this.props.placeholderText || 'Default placeholder...',
    tasks: [],
    preventSubmission: true,
    errorMsg: null
  }

  handleInputChange(evt) {
    let inputText = evt.target.value;

    if ( inputText.trim() !== '' ) {
      this.setState({
        errorMsg: null,
        preventSubmission: false,
        inputValue: inputText
      });
    } else {
      this.setState({
        errorMsg: 'Must enter a value!',
        preventSubmission: true,
        inputValue: inputText
      });
    }
  }

  addTask(evt) {
    let newTask;

    evt.preventDefault();

    newTask = this.state.inputValue;

    if ( this.state.tasks.indexOf(newTask) === -1 ) {
      this.setState({
        tasks: this.state.tasks.concat(this.state.inputValue),
        inputValue: '',
        preventSubmission: true
      });
    } else {
      this.setState({
        errorMsg: `${newTask} already exists in the list!`,
        inputValue: '',
        preventSubmission: true
      });
    }
  }

  toggleStrikeClass(evt) {
    evt.target.classList.toggle('strike');
  }

  removeTask(taskIndex) {
    let newTasks;

    newTasks = this.state.tasks.filter((item, index) => {
      return index !== taskIndex;
    });

    this.setState({
      tasks: newTasks
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.addTask }>
          <input
            type="text"
            placeholder={ this.state.placeholderText }
            value={ this.state.inputValue }
            onChange={ this.handleInputChange }
          />
          <button type='submit' disabled={this.state.preventSubmission}>
            { this.state.preventSubmission }
            Add Task
          </button>
        </form>

        <div> { this.state.errorMsg } </div>

        <ul>
          { this.state.tasks.map((task, index) => {
            return (
              <li key={ index }>
                <span onClick={ this.toggleStrikeClass }>
                  { task }
                </span>

                <span
                  className='removeItem'
                  onClick={ () => { this.removeTask(index) } }
                >
                  remove
                </span>
              </li>
            )
          }) }
        </ul>
      </div>
    )
  }
}

export default App;
