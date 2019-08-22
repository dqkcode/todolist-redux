import './App.css';
import TableRow from './components/TableRow';
import TaskInfo from './components/TaskInfo';
import TaskControls from './components/TaskControls';

import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      showTaskForm:false
    }
  }
  c4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  }
  genId() {
    return this.c4() + this.c4() + '-' + this.c4() + this.c4() + '-' + this.c4() + this.c4()
  }
  onCreateData = () => {
    var tasks_data = [
      {
        id: this.genId(),
        name: 'Python',
        status: true
      },
      {
        id: this.genId(),
        name: 'C++',
        status: true
      },
      {
        id: this.genId(),
        name: 'Java',
        status: false
      }
    ]
    this.setState({
      tasks: tasks_data
    });
    localStorage.setItem('localStorage_tasks', JSON.stringify(tasks_data))
    
    
  }
  UNSAFE_componentWillMount() {
    if (localStorage && localStorage.getItem('localStorage_tasks')) {
      let localStorage_tasks = JSON.parse(localStorage.getItem('localStorage_tasks'))
      this.setState({
        tasks: localStorage_tasks
      });
    }
  }
  onShowInfoForm = () => {
    this.setState({
      showTaskForm : !this.state.showTaskForm
    });
  }
  onCloseInfoForm = () => {
    this.setState({
      showTaskForm : false
    });
  }
  onSubmitInfo=(data) => {
    data.id = this.genId();
    data.name = data.inputName
    data.status = data.selectStatus
    let {tasks} = this.state
    tasks.push(data)
    this.setState({
      tasks:tasks
    });
    localStorage.setItem('localStorage_tasks',JSON.stringify(tasks))
  }
  render() {
    let {tasks,showTaskForm} = this.state
    let infoForm = showTaskForm?<TaskInfo 
    onCloseInfoForm={this.onCloseInfoForm}
    onSubmit={this.onSubmitInfo}
    />:''
    return (
      <div className="App">
        <div className="row">
          <div className="col-sm-4 offset-sm-4">
            <h5 className="alert-heading ">Todo List</h5>
            <button type="button" className="col-sm-6 btn btn-info m-1 float-left" onClick={this.onCreateData}><i className="fas fa-plus-square ml-1"> </i> Create Data</button>

          </div>
          <hr />

        </div>
        {/* end header */}
        <div className="row mt-3">
          
          <div className={showTaskForm?"col-sm-4":""}>
              {infoForm}
            {/* end taskinfo */}
          </div>
          <div className={showTaskForm?"col-sm-8":"col-sm-12"}>
            <div className="card">
              <div className="card-header"> Task List </div>
              <div className="card-body">
              <div className="row">
              <button type="button" 
              className="col-sm-2 btn btn-info m-1 float-left"
              onClick={this.onShowInfoForm}
              > 
                <i className="fas fa-plus-square" > </i>
                 &nbsp; Add Task
                 </button>
                <TaskControls ></TaskControls>
                </div>
                {/* end list controls */}
                <div className="row">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Staus</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    
                      <TableRow tasks={tasks}></TableRow>
                      {/* end table row task */}
                  
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* end tasklist */}
        </div>

      </div>

    );
  }
}

export default App;

