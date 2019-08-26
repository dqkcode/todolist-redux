import './App.css';
import TableRow from './components/TableRow';
import TaskInfo from './components/TaskInfo';
import TaskControls from './components/TaskControls';
import { connect } from "react-redux";
import  * as actions  from "./actions";
import React, { Component } from 'react';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      showTaskForm: false,
      objectEdit: null,
      onjectSearch: {
        searchByName: '',
        searchByStatus: 1
      },
      inputTxtKeyword: '',
      sortType: {
        type: 'name',
        value: 'az'
      }
    }
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
    // if (this.state.objectEdit !== null && this.state.showTaskForm) {
    //   // console.log("ob != null and show form");
    //   this.setState({
    //     showTaskForm: true,
    //     objectEdit: null
    //   })
    // } else {
    //   this.setState({
    //     showTaskForm: !this.state.showTaskForm,
    //     objectEdit: null
    //   })
    // }
    this.props.onOpenForm()
  }
  onCloseInfoForm = () => {
    // this.setState({
    //   showTaskForm: false
    // });
    this.props.onCloseForm()
  }
  onShowEditForm = () => {
    this.setState({
      showTaskForm: true
    });
  }
  onSubmitInfo = (data) => {
    var { tasks } = this.state
    // console.log('data.id :', data.id);
    if (data.id === '') {
      // console.log('data.id -if :', data.id);
      data.id = this.genId();
      data.name = data.inputName
      data.status = data.selectStatus
      tasks.push(data)
      // console.log('data :', data);
    } else {
      let index = this.findIndex(data.id)
      tasks[index].name = data.inputName;
      tasks[index].status = data.selectStatus;
    }
    this.setState({
      tasks: tasks,
      objectEdit: null
    })
    localStorage.setItem('localStorage_tasks', JSON.stringify(tasks))
  }
  onUpdateStatus = (id) => {
    let { tasks } = this.state
    // let index = this.findIndex(id) //using my function
    let index = _.findIndex(tasks, (task) => task.id === id)
    if (index !== -1) {
      tasks[index].status = !tasks[index].status
      // console.log('tasks[index].status :', tasks[index].status);
    }
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('localStorage_tasks', JSON.stringify(tasks))
  }
  onRemove = (id) => {
    let { tasks } = this.state
    let index = this.findIndex(id)
    if (index !== -1) {
      tasks.splice(index, 1)
    }
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('localStorage_tasks', JSON.stringify(tasks))
    this.onCloseInfoForm()
  }
  findIndex = (id) => {
    let { tasks } = this.state
    let result = -1
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index
        // console.log('index :', index);
      }
    })
    return result
  }
  onEdit = (id) => {
    // this.onCloseInfoForm()
    let { tasks } = this.state
    let index = this.findIndex(id)
    let task = tasks[index]
    this.setState({
      objectEdit: task
    })
    this.onShowEditForm()

  }
  onSearch = (name, status) => {
    let searchByStatus = parseInt(status, 10)

    this.setState({
      objectSearch: {
        searchByName: name.toLowerCase(),
        searchByStatus: searchByStatus
      }
    });
  }
  searchOnFormControl = (inputTxtKeyword) => {
    this.setState({
      inputTxtKeyword: inputTxtKeyword.toLowerCase()
    });
  }
  onSort = (typeName, typeValue) => {
    // console.log('typeName :', typeName);
    // console.log('typeValue :', typeValue);
    this.setState({
      sortType: {
        type: typeName,
        value: typeValue
      }
    });
  }

  render() {
    let {
      tasks,
      objectEdit,
      objectSearch,
      inputTxtKeyword,
      sortType } = this.state
    //  console.log('sortType :', sortType);

    let { showInfoForm } = this.props
    // console.log('showInfoForm :', showInfoForm);
    if (objectSearch) {
      if (objectSearch.searchByName) {
        tasks = tasks.filter(
          (task) => task.name.toLowerCase().indexOf(objectSearch.searchByName) !== -1
        )
      }
      tasks = tasks.filter(
        (task) => {
          if (objectSearch.searchByStatus === 1) {
            return task
          } else {
            return task.status === (objectSearch.searchByStatus === 0 ? true : false)
          }
        }
      )


    }
    // console.log('inputTxtKeyword :', inputTxtKeyword);

    tasks = tasks.filter(
      (task) =>
        inputTxtKeyword ?
          task.name.toLowerCase().indexOf(inputTxtKeyword) !== -1 :
          tasks)
    if (sortType.type === 'name') {
      sortType.value === 'az'
        ? tasks.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
        : tasks.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? 1 : -1)
    } else {
      sortType.value === 'on'
        ? tasks.sort((a, b) => (a.status > b.status) ? -1 : 1)
        : tasks.sort((a, b) => (a.status < b.status) ? -1 : 1)

    }

    let infoForm = showInfoForm ? <TaskInfo
      onCloseInfoForm={this.onCloseInfoForm}
      onSubmit={this.onSubmitInfo}
      objectEdit={objectEdit}
      tasks={tasks}
    /> : ''

    return (
      <div className="App">
        <div className="row">
          <div className="col-sm-4 offset-sm-4">
            <h5 className="alert-heading ">Todo List</h5>
            {/* <button type="button" className="col-sm-6 btn btn-info m-1 float-left" onClick={this.onCreateData}><i className="fas fa-plus-square ml-1"> </i> Create Data</button> */}

          </div>
          <hr />

        </div>
        {/* end header */}
        <div className="row mt-3">

          <div className={showInfoForm ? "col-sm-4" : ""}>
            {infoForm}
            {/* end taskinfo */}
          </div>
          <div className={showInfoForm ? "col-sm-8" : "col-sm-12"}>
            <div className="card">
              <div className="card-header"> Task List </div>
              <div className="card-body">
                <div className="row">
                  <button type="button"
                    id="btn-show"
                    className="col-sm-2 btn btn-info m-1 float-left"
                    onClick={this.onShowInfoForm}
                  >
                    <i className="fas fa-plus-square" > </i>
                    &nbsp; Add Task
                 </button>
                  <TaskControls
                    searchOnFormControl={this.searchOnFormControl}
                    onSort={this.onSort}
                  ></TaskControls>
                </div>
                {/* end list controls */}
                <div className="row">
                  <table className="table table-striped ">
                    {/* <colgroup>
          <col className="col-sm-1"/>
          <col className="col-sm-5"/>
          <col className="col-sm-3"/>
          <col className="col-sm-3"/>
        </colgroup> */}
                    <thead>
                      <tr className="d-flex">
                        <th className="col-1">No.</th>
                        <th className="col-6">Name</th>
                        <th className="col-2">Staus</th>
                        <th className="col-3">Action</th>
                      </tr>
                    </thead>
                    <TableRow
                      // tasks={tasks}
                      // updateStatus={this.onUpdateStatus}
                      // Remove={this.onRemove}
                      // Edit={this.onEdit}
                      onSearch={this.onSearch}
                    ></TableRow>
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
const mapStateToProps = (state) => ({
  showInfoForm: state.showInfoForm
})

const mapDispatchToProps = (dispatch) => ({
  onOpenForm : ()=>dispatch(actions.openForm()),
  onCloseForm : ()=>dispatch(actions.closeForm()),
  onToggleForm : ()=>dispatch(actions.toggleForm()),
})
export default connect(mapStateToProps, mapDispatchToProps)(App);

